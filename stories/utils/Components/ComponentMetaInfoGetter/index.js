import {normalize} from 'path';

import React from 'react';
import PropTypes from 'prop-types';

import parser from '../AutoDocs/parser';

export default class ComponentMetaInfoGetter extends React.PureComponent {
  static propTypes = {
    componentSrcFolder: PropTypes.string,
    showStoryContent: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.state = {
      isLoading: true,
      source: undefined,
      readmeTestKit: undefined,
      component: undefined,
      parsedSource: undefined
    };
  }

  componentDidMount() {
    const {
      componentSrcFolder
    } = this.props;

    if (!componentSrcFolder) {
      this.setState({
        isLoading: false
      });
      return;
    }

    const componentSourcePromise = this.getComponentSource();
    Promise.all([
      componentSourcePromise,
      this.getReadmeTestKit(),
      this.getComponentInstance(),
      this.getParsedSource(componentSourcePromise),
      this.getComponentReadme()
    ]).then(([source, readmeTestKit, component, parsedSource]) => {
      this.setState({
        isLoading: false,
        source,
        readmeTestKit,
        component,
        parsedSource
      });
    });
  }

  render() {
    return this.props.showStoryContent(this.state);
  }

  getComponentSource(additionalPath = '') {
    const {
      componentSrcFolder
    } = this.props;

    const resolvedPath = normalize(`${componentSrcFolder}/${additionalPath}`);
    return import(`!raw-loader!wix-style-react/${resolvedPath}`).then(source => {
      const sourceContainsOneLine = source.trim().split('\n').length === 1;
      const onlyDefaultExportPresent = source.startsWith('export {default} from');
      if (sourceContainsOneLine && onlyDefaultExportPresent) {
        let newSourcePath = '';
        source.replace(/(?!['"])([./a-z]+)(?=['"])/gi, match => {
          newSourcePath = match;
        });

        newSourcePath = newSourcePath.replace(/^\.\//, '/');

        return this.getComponentSource(`${additionalPath}${newSourcePath}`);
      }

      return source;
    });
  }

  getComponentInstance() {
    return import(`wix-style-react/${this.props.componentSrcFolder}/`).then(component => component.default).catch(console.warn);
  }

  getParsedSource(componentSourcePromise) {
    return componentSourcePromise.then(source => {
      const parsedSource = parser(source);

      return this.getAllPropTypesFromParsedSource(parsedSource).then(collectedProps => {
        parsedSource.props = {
          ...collectedProps,
          ...parsedSource.props
        };
        return parsedSource;
      });
    });
  }

  getAllPropTypesFromParsedSource(parsedSource, collectedProps = {}) {
    const {
      composes = [],
      props
    } = parsedSource;

    if (composes.length) {
      const componentSourcePromises = composes.map(dependencyPath => this.getComponentSource(dependencyPath));

      return Promise.all(componentSourcePromises)
         .then(dependencySources => {
           const collectedPropPromises = dependencySources.map(source => this.getAllPropTypesFromParsedSource(parser(source)));

           return Promise.all(collectedPropPromises).then(collectedResults =>
             collectedResults.reduce(
               (acc, props) => ({
                 ...props,
                 ...acc
               }),
               {}
             )
           );
         });
    }

    const result = {
      ...props,
      ...collectedProps
    };

    return Promise.resolve(result);
  }

  getComponentReadme() {
    return this.loadMdFile('README');
  }

  getReadmeTestKit() {
    return this.loadMdFile('README.TESTKIT');
  }

  loadMdFile(fileName) {
    const baseName = fileName.endsWith('.md') ? fileName.replace(/\.md$/gi, '') : fileName;
    return import(`wix-style-react/${this.props.componentSrcFolder}/${baseName}.md`).catch(() => {});
  }
}
