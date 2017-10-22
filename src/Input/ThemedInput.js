import React from 'react';
import classNames from 'classnames';
import Input from './Input';
import Typography from '../Typography';

import styles from './Input.scss';

class ThemedInput extends Input {
  render() {
    const {
      id,
      size,
      dataHook,
      title,
      theme,
      rtl,
      disabled,
      error,
      forceHover,
      forceFocus,
      roundInput,
      noLeftBorderRadius,
      noRightBorderRadius,
      value,
      withSelection
    } = this.props;

    const classes = {
      [styles.rtl]: !!rtl,
      [styles.disabled]: disabled,
      [styles.hasError]: !!error,
      [styles.hasHover]: forceHover,
      [styles.hasFocus]: forceFocus || this.state.focus,
      [styles.roundInput]: roundInput,
      [styles.hasValue]: (value && value.length) || (this.input && !!this.input.value),
      [noRightBorderRadius]: noRightBorderRadius,
      [noLeftBorderRadius]: noLeftBorderRadius
    };

    let placeholder = this.props.placeholder;
    if (theme === 'amaterial' && !classes[styles.hasFocus] && !classes[styles.hasValue]) {
      placeholder = '';
    }
    return (
      <div
        className={classNames(classes, styles.root, styles[`theme-${theme}`], styles[`size-${size}${withSelection ? '-with-selection' : ''}`])}
        data-hook={dataHook}
        >
        {(theme === 'amaterial') &&
        <label className={classNames(styles.materialTitle, Typography.t1_1)} htmlFor={id}>{title}</label>}
        {super.render({placeholder})}
        {(theme === 'material') && <div className={`${styles.bar} ${styles.barBlack}`}/>}
        {(theme === 'amaterial') && <div className={`${styles.bar} ${styles.barBlue}`}/>}
      </div>
    );
  }
}

export default ThemedInput;
