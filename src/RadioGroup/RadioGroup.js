import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import RadioButton from './RadioButton/RadioButton';
import styles from './RadioGroup.scss';
import WixComponent from '../BaseComponents/WixComponent';
import classNames from 'classnames';

/**
 * component for easy radio group creation.
 *
 * similar to HTML `<input type="radio"/>` except you don't need to handle `name` or click handlers
 */
class RadioGroup extends WixComponent {
  constructor(props) {
    super(props);
    this.name = uniqueId('RadioGroup_');
  }

  render() {
    const {onChange, disabled, disabledRadios, value, vAlign, display, type, spacing, lineHeight} = this.props;
    const style = {lineHeight, marginBottom: display === 'vertical' && spacing};

    return (
      <div className={classNames(styles[display], {[styles.buttonType]: type === 'button'})}>
        {React.Children.map(this.props.children, radio => (
          <RadioGroup.Radio
            dataHook={radio.props.dataHook}
            value={radio.props.value}
            name={this.name}
            onChange={onChange}
            vAlign={vAlign}
            type={type}
            disabled={disabled || disabledRadios.indexOf(radio.props.value) !== -1}
            checked={radio.props.value === value}
            style={style}
            icon={radio.props.icon}
            >
            {radio.props.children}
          </RadioGroup.Radio>
        ))}
      </div>
    );
  }
}

RadioGroup.propTypes = {
  /** Callback function when user selects a different value */
  onChange: PropTypes.func,

  /** Selected radio button value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** the values of the disabled radio buttons */
  disabledRadios: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

  /** Positioning of the radio bottom compared to the label */
  vAlign: PropTypes.oneOf(['center', 'top']),

  /** Make the entire control disabled */
  disabled: PropTypes.string,

  /** Decided which type of child controls to render */
  type: PropTypes.string,

  /** Display direction of the radios */
  display: PropTypes.oneOf(['vertical', 'horizontal']),
  children: PropTypes.arrayOf((propValue, key) => {
    if (propValue[key].type.name !== 'RadioButton') {
      return new Error(`RadioGroup: Invalid Prop children was given. Validation failed on child number ${key}`);
    }
  }),

  /** Vertical spacing between radio buttons */
  spacing: PropTypes.string
};

RadioGroup.defaultProps = {
  disabledRadios: [],
  onChange: () => {},
  value: '',
  vAlign: 'center',
  display: 'vertical',
  spacing: '12px',
  lineHeight: '24px'
};

RadioGroup.Radio = RadioButton;

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
