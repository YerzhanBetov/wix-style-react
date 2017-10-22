import React from 'react';
import PropTypes from 'prop-types';
import {storiesOf} from '@storybook/react';

import TextLink from '../../../../src/TextLink';
import Loader from '../../../../src/Loader/Loader';

import Markdown from '../Markdown';
import CodeBlock from '../CodeBlock';
import AutoDocs from '../AutoDocs';
import AutoExample from '../AutoExample';
import TabbedView from '../TabbedView';
import ComponentMetaInfoGetter from '../ComponentMetaInfoGetter';

import styles from './styles.scss';

/**
 * # story( )
 *
 * ### Note about special case with `componentSrcFolder` property:
 *
 * In case you pass `componentSrcFolder` property, you don't need to pass "name", "source", "component", "readme" or "readmeTestkit" properties (but you can override any of that values).
 * Instead, it will automatically resolve all of them:
 * * __name__ - `displayName` of the component, or on the `name` of class or function.
 * * __source__ - it will import source of component using `!raw-loader!` using `webpack`'s dynamic `import()`
 * * __component__ - it will import component using `webpack`'s dynamic `import()`
 * * __readme__ - it will import file with name `README.md` from the component directory using `webpack`'s dynamic `import()`
 * * __readmeTestkit__ - it will import file with name `README.TESTKIT.md` from the component directory using `webpack`'s dynamic `import()`
 *
 * Additionally, it will parse the source of component and if inside of propTypes there are spread operators - it will correctly resolve it (import that sources and get the `propTypes` from them. It's not the black magic 🎩, don't even think that way!).
 * This correctly parsed source will be passed down to `AutoDocs` and `AutoExample` so they will be able to generate full table of props and full example.
 */
function Story(props) {
  const {
    category,
    name: customName,
    readme: customReadme,
    readmeTestkit: customReadmeTestKit,
    source: customSource,
    component: customComponent,
    componentSrcFolder,
    storyName = customName || componentSrcFolder,
    componentProps,
    examples,
    exampleProps
  } = props;

  if (typeof componentSrcFolder === 'undefined') {
    const allRequiredPropsPresent = customName && customSource && customComponent;
    if (!allRequiredPropsPresent) {
      console.error('Props with error:', props);
      throw new Error('You are not passed "componentSrcFolder" to story function. Is this case those params are required: "name", "source", "component"!');
    }
  }

  if (typeof storyName === 'undefined') {
    console.error('Props with error:', props);
    throw new Error('You need to provide either "storyName" or "name" to the story function!');
  }


  storiesOf(category, module).add(storyName, () => (
    <ComponentMetaInfoGetter
      componentSrcFolder={componentSrcFolder}
      showStoryContent={
        params => {
          const {
            isLoading,
            source,
            readmeTestKit,
            component,
            name = customName || (component && (component.displayName || component.name)),
            readme,
            parsedSource
          } = params;

          const actualSource = customSource || source;
          const actualReadmeTestKit = customReadmeTestKit || readmeTestKit;
          const actualComponent = customComponent || component;
          const actualReadme = customReadme || readme;

          if (isLoading) {
            return (
              <div className={styles.loaderWrapper}>
                <Loader text="Loading component meta-data, please, wait..."/>
              </div>
            );
          }

          return (
            <TabbedView tabs={['Usage', 'API', 'TestKit']}>
              <div className={styles.usage}>
                {actualReadme ?
                  <Markdown source={actualReadme}/> :
                  <Markdown source={`# \`<${name}/>\``}/>
                }

                {name &&
                <div className={styles.githubLink}>
                  <TextLink
                    link={`https://github.com/wix/wix-style-react/blob/master/src/${name}`}
                    target="_blank"
                    >
                    View source on GitHub
                  </TextLink>
                </div>
                }

                {name && <CodeBlock source={`import ${name} from 'wix-style-react/${name}';`}/>}

                {actualComponent && actualSource &&
                <AutoExample
                  component={actualComponent}
                  source={actualSource}
                  componentProps={componentProps}
                  parsedSource={parsedSource}
                  exampleProps={exampleProps}
                  />
                }

                {examples}
              </div>

              {actualSource && <AutoDocs source={actualSource} parsedSource={parsedSource}/>}

              {actualReadmeTestKit && <Markdown source={actualReadmeTestKit}/>}
            </TabbedView>
          );
        }
      }
      />
  ));

  // need to return some JSX in order to get "react-docgen" parser working
  return <p>dummy</p>;
}

Story.propTypes = {
  /**
   * Name of Storybook "section" under which this story will be placed (e.g. `Core`, `6. Navigation`, `3. Inputs`)
   */
  category: PropTypes.string.isRequired,

  /**
   * Name of the component, must be correct (will be used as story title, as part of `import` example, as part of github link)
   *
   */
  name: PropTypes.string,

  /**
   * Name of the story in sidebar.
   * Default value will be used from property `name` (see above) or, if you didn't provided the name, it will take the value from property `componentSrcFolder`.
   *
   */
  storyName: PropTypes.string,

  /**
   * A markdown-compatible string to be printed above interactive component example.
   * In case this property will be omitted - just name of component will be displayed.
   */
  readme: PropTypes.string,

  /**
   * A markdown-compatible string to be printed within "TestKit" tab.
   * No "TestKit" tab will displayed if this property is not provided.
   */
  readmeTestkit: PropTypes.string,

   /**
   * The actual source of a component.
   *   > Use `!raw-loader!` to get it, e.g.: `import source from '!raw-loader!wix-style-react/ColorPicker/color-picker';`
   *   > Beware that the actual source is required and not just something like `export {default} from './component.js'`
   */
  source: PropTypes.string,

  /**
   * Reference to react component which will be used within interactive example
   */
  component: PropTypes.element,

  /**
   * The relative (for the `src` folder) path to the component.
   *
   * E.g. for the component `Button` located in `/src/Backoffice/Button/index.js`
   * this property should be set to `'Backoffice/Button'`
   *
   */
  componentSrcFolder: PropTypes.string,

  /**
   * Props that will be used within `component`. Either given as-is with `object` or computed in `function`.
   *  * when `object`, it will be given to `component` as props. This is the place to set any props that are required by `component`
   *  * when `function`, its signature is `(setProps, getProps) => props` where:
   *    * `setProps` - `function`: accepts one argument - object. When called this object will be set as `componentProps`
   *    * `getProps` - `function`: does not accept anything. When called it will return an object containing currently used props
   *    * `props` - return value `object`: whatever is returned will be used as new `componentProps`
   *               This is used to allow dynamic changes from within `component`. The return value of this function will be used as `component` props.

   For example:

    ```js
    // 1. `componentProps` as object
    story({
      name: 'ToggleSwitch',
      // ...{other props}
      componentProps: {
        onChange: () => console.log('Danger! Component was changed!')
      }
    })
    // The component inside __story__ function will behave the same as:
    <ToggleSwitch onChange={() => console.log('Danger! Component was changed!')}/>


    // 2. `componentProps` as function
    story({
      name: 'ToggleSwitch',
      // ...{other props}
      componentProps: (setProps, getProps) => ({
        checked: false,
        onChange: () => setProps({checked: !getProps().checked})
      }),
    })
    ```
   */
  componentProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

  /**
   * Any react component to be displayed below interactive component example.
   * Usually this holds more examples.
   */
  examples: PropTypes.element,
  exampleProps: PropTypes.object
};

Story.defaultProps = {
  componentProps: {},
  examples: null
};

export default Story;
