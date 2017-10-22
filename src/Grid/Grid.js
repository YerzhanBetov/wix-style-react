import React, {Component} from 'react';
import styles from './Grid.scss';
import Card from '../Card';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class RawContainer extends Component {

  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className={styles['raw-container']}>
        {this.props.children}
      </div>
    );
  }
}

class Container extends Component {

  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className={styles.wixContainer}>
        {this.props.children}
      </div>
    );
  }
}

class Row extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    rtl: PropTypes.bool,
    stretchViewsVertically: PropTypes.bool,
    dataHook: PropTypes.string
  };

  static defaultProps = {
    stretchViewsVertically: false
  };

  render() {
    const rowClasses = classNames(
      styles.row,
      this.props.className,
      {
        [styles.rtl]: this.props.rtl,
        [styles.stretch_vertically_row]: this.props.stretchViewsVertically
      });

    return (
      <div className={rowClasses} data-hook={this.props.dataHook}>
        {this.props.children}
      </div>
    );
  }
}

class AutoAdjustedRow extends Component {

  DEFAULT_MAX_SPAN = 12;
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const cssClasses = classNames(styles.row, styles.flexContainer);
    const children = this.props.children;
    const cols = Array.isArray(children) ? children : [children];
    const spanSize = Math.floor(this.DEFAULT_MAX_SPAN / cols.length);
    return (
      <div className={cssClasses}>
        {cols.map((child, index) => <Col span={spanSize} key={index}>{child}</Col>)}
      </div>
    );
  }
}

class Col extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    span: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rtl: PropTypes.bool,
    xs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    md: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lg: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    xl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dataHook: PropTypes.string
  };

  isVisibleHidden(str) {
    return str === 'hidden' || str === 'visible';
  }

  isLegalCol(numStr) {
    if (numStr && !this.isVisibleHidden(numStr)) {
      const num = Number(numStr);
      return Number.isInteger(num) && num > 0 && num <= 12;
    }
    return false;
  }

  render() {
    const columnClasses = classNames(
      this.props.className,
      styles.column,
      {[styles.rtl]: this.props.rtl},
      {[styles[`colXs${this.props.span}`]]: this.isLegalCol(this.props.span)},
      {[styles[`colXs${this.props.xs}`]]: this.isLegalCol(this.props.xs)},
      {[styles[`colSm${this.props.sm}`]]: this.isLegalCol(this.props.sm)},
      {[styles[`colMd${this.props.md}`]]: this.isLegalCol(this.props.md)},
      {[styles[`colLg${this.props.lg}`]]: this.isLegalCol(this.props.lg)},
      {[styles[`colXl${this.props.xl}`]]: this.isLegalCol(this.props.xl)},
      {[styles[`${this.props.xs}Xs`]]: this.isVisibleHidden(this.props.xs)},
      {[styles[`${this.props.sm}Sm`]]: this.isVisibleHidden(this.props.sm)},
      {[styles[`${this.props.md}Md`]]: this.isVisibleHidden(this.props.md)},
      {[styles[`${this.props.lg}Lg`]]: this.isVisibleHidden(this.props.lg)},
    );
    return (
      <div className={columnClasses} data-hook={this.props.dataHook}>
        {this.props.children}
      </div>
    );
  }
}

export {Container, RawContainer, Row, AutoAdjustedRow, Col, Card};
