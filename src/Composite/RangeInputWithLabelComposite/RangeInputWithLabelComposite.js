import React, {Children} from 'react';
import {any} from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import styles from './RangeInputWithLabelComposite.scss';
import classNames from 'classnames';
import FieldLabelAttributes from '../../FieldLabelAttributes/FieldLabelAttributes';

class RangeInputWithLabelComposite extends WixComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false
    };
  }

  _doKeyDown(e) {
    const keys = {
      upArrow: 38,
      downArrow: 40
    };
    if (e.keyCode === keys.upArrow && !isNaN(e.target.value)) {
      e.preventDefault();
      e.target.value++;
    }
    if (e.keyCode === keys.downArrow && !isNaN(e.target.value)) {
      e.preventDefault();
      e.target.value--;
    }
  }

  _handleFocus() {
    this.setState({hasFocus: true});
  }

  _handleBlur() {
    this.setState({hasFocus: false});
  }

  render() {
    const children = Children.toArray(this.props.children);
    const label = children.length === 3 ? (
      <div className={styles.label}>
        {children[0]}
        { this.props.required || this.props.info ? <FieldLabelAttributes required={this.props.required} info={this.props.info}/> : null }
      </div>) : null;
    const firstInput = children.length === 3 ? children[1] : children[0];
    const lastInput = children.length === 3 ? children[2] : children[1];

    const moreFirstInputProps = {
      noRightBorderRadius: styles.firstinput,
      onKeyDown: e => this._doKeyDown(e),
      onFocus: e => this._handleFocus(e),
      onBlur: e => this._handleBlur(e)
    };

    const moreLastInputProps = {
      noLeftBorderRadius: styles.lastinput,
      onKeyDown: e => this._doKeyDown(e),
      onFocus: e => this._handleFocus(e),
      onBlur: e => this._handleBlur(e)
    };

    const inputWrapperClassNames = classNames({
      [styles.inputs]: true,
      [styles.hasFocus]: this.state.hasFocus
    });

    return (<div className={styles.wrapper}>
      {label}
      <div className={inputWrapperClassNames}>
        { React.cloneElement(firstInput, moreFirstInputProps)}
        { React.cloneElement(lastInput, moreLastInputProps)}
      </div>
    </div>);
  }
}

RangeInputWithLabelComposite.propTypes = {
  children: any
};

RangeInputWithLabelComposite.displayName = 'RangeInputWithLabelComposite';

export default RangeInputWithLabelComposite;
