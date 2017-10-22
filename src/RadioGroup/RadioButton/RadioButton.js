import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import styles from '../RadioGroup.scss';
import classNames from 'classnames';
import WixComponent from '../../BaseComponents/WixComponent';
import typography, {convertFromUxLangToCss} from '../../Typography';

class RadioButton extends WixComponent {
  constructor(props) {
    super(props);
    this.id = uniqueId();
  }

  render() {
    const {value, vAlign, checked, disabled, name, type, onChange, style} = this.props;

    const radioClasses = classNames({
      [styles.radio]: true,
      [styles.checked]: checked,
      [styles.disabled]: disabled
    });

    const labelClasses = classNames({
      [styles.vcenter]: vAlign === 'center',
      [styles.vtop]: vAlign === 'top',
      [typography[convertFromUxLangToCss('T1.1')]]: true
    });

    const buttonClasses = classNames({
      [styles.checked]: checked,
      [styles.radioButton]: true
    });

    const {icon, children} = this.props;
    return (
        type === 'button' ? (
          <button
            className={buttonClasses}
            checked={checked}
            disabled={disabled}
            id={this.id}
            onClick={() => (!checked && !disabled) ? onChange(value) : null}
            >
            {icon ? <span>{icon}</span> : null}
            {children ? <span>{children}</span> : null}
          </button>
        ) : (
          <div className={styles.radioWrapper} style={style}>
            <input
              type="radio"
              name={name}
              value={value}
              id={this.id}
              checked={checked}
              disabled={disabled}
              onChange={() => (!checked && !disabled) ? onChange(value) : null}
              />
            <label htmlFor={this.id} className={labelClasses} data-hook="radio-label">
              <div className={radioClasses}/>
              <div className={styles.children}>
                {this.props.children}
              </div>
            </label>
          </div>
      )
    );
  }
}

RadioButton.defaultProps = {
  vAlign: 'center'
};

RadioButton.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  vAlign: PropTypes.oneOf(['center', 'top']),
  name: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  style: PropTypes.object,
  type: PropTypes.string
};

RadioButton.displayName = 'RadioGroup.Button';

export default RadioButton;
