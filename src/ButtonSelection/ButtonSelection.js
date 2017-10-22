import React from 'react';
import {arrayOf, func, string} from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import s from './ButtonSelection.scss';

class ButtonSelection extends WixComponent {
  static propTypes = {
    buttonsNames: arrayOf(string.isRequired).isRequired,
    value: string,
    onChange: func.isRequired
  }

  componentWillMount() {
    const {value, buttonsNames} = this.props;
    if (value && (buttonsNames.every(b => b !== value))) {
      throw new Error('ButtonSelection: Invalid button selected');
    }
  }

  render() {
    const {value, buttonsNames, onChange} = this.props;
    return (
      <div className={s.buttonsComplex}>
        {
          buttonsNames.map(buttonName =>
            <span
              key={buttonName}
              className={value === buttonName ? s.selected : s.unselected}
              onClick={() => {
                if (buttonName !== value) {
                  onChange(buttonName);
                }
              }}
              >
              {buttonName}
            </span>
          )
        }
      </div>
    );
  }
}

ButtonSelection.displayName = 'ButtonSelection';

export default ButtonSelection;
