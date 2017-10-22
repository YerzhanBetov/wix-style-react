import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import Languages from '../Icons/dist/components/Languages';
import IconWithOptions from '../IconWithOptions';

export default class LanguagePicker extends WixComponent {
  createDividedChildren(availableOptions) {
    const dividerChild = React.cloneElement(
      this.props.children[0], {
        children: '-',
        languageKey: '-',
        linkTo: '-'
      });

    const dividedChildren = [...availableOptions];
    dividedChildren.forEach((_, index) => dividedChildren.splice((index * 2) + 1, 0, dividerChild));
    dividedChildren.pop();

    return dividedChildren;
  }

  createIconWithOptionsOptions(children) {
    const availableOptions = children.filter(opt => opt.props.languageKey !== this.props.selectedId);
    const dividedChildren = this.createDividedChildren(availableOptions);

    return dividedChildren.map(languagePickerOption => {
      const {children: languageName, languageKey, linkTo} = languagePickerOption.props;

      return (
        <IconWithOptions.Option key={languageKey} id={languageKey} linkTo={linkTo}>
          {languageName}
        </IconWithOptions.Option>
      );
    });
  }

  render() {
    const {children, ...rest} = this.props;

    return (
      <IconWithOptions {...rest}>
        <IconWithOptions.Icon><Languages size="18"/></IconWithOptions.Icon>
        {this.createIconWithOptionsOptions(children)}
      </IconWithOptions>
    );
  }
}

LanguagePicker.displayName = 'LanguagePicker';

LanguagePicker.defaultProps = {
  itemHeight: 'big',
  maxHeightPixels: 566
};

LanguagePicker.propTypes = {
  ...IconWithOptions.propTypes,

  /**
    * Specify the languages list to render
    *
    * children __must__ be `<LanguagePicker.Option/>` component with:
    *   * `languageKey` - string, required
    *   * `children` - string
    */
  children: PropTypes.arrayOf((propValue, key) => {
    if (propValue[key].type !== LanguagePicker.Option) {
      return new Error(`LanguagePicker: Invalid Prop children was given. Validation failed on child number ${key}`);
    }
  })
};

LanguagePicker.Option = () => null;

LanguagePicker.Option.propTypes = {
  languageKey: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
  children: PropTypes.string
};
