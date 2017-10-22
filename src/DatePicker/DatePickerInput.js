import React, {Component} from 'react';
import PropTypes from 'prop-types';
import omit from 'omit';
import Input from '../Input';
import styles from './DatePickerInput.scss';

export default class DatePickerInput extends Component {

  static propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string,
    dateFormat: PropTypes.func,
    style: PropTypes.object,
    onEnterPressed: PropTypes.func,
    customInput: PropTypes.node,
    dataHook: PropTypes.string
  };

  static defaultProps = {
    prefix: <div className={styles.icon}/>,
    onEnterPressed: () => {}
  }

  render() {
    const desiredProps = omit(['style', 'customInput'], this.props);
    const {style, onClick, onEnterPressed} = this.props;
    const customInput = this.props.customInput || <Input/>;

    return (
      <div style={style} onClick={onClick}>
        {
          React.cloneElement(customInput, {
            ref: Input => this.input = Input,
            onEnterPressed: () => onEnterPressed() && this.blur(),
            onEscapePressed: () => this.blur(),
            ...desiredProps,
            ...customInput.props
          })
        }
      </div>
    );
  }

  blur() {
    this.input.blur();
  }

  focus = () => {}
}
