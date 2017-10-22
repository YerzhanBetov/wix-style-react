import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tag.scss';
import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import Typography from '../Typography';
import SmallX from '../Icons/dist/components/SmallX';

/**
  * A Tag component
  */
class Tag extends WixComponent {
  render() {
    const {id, children, thumb, removable, onRemove, size, wrap, disabled, theme} = this.props;

    const className = classNames({
      [styles.tag]: true,
      [styles.large]: size === 'large',
      [styles.tagWrap]: wrap,
      [styles.disabled]: disabled,
      [styles[`${theme}Theme`]]: true
    });

    const innerClassName = classNames({
      [styles.innerTagWrap]: wrap,
      [Typography.t4]: true
    });

    const title = wrap ? children : '';

    return (
      <span className={className} disabled={disabled} id={id} title={title}>
        {thumb && <span className={styles.thumb}>{thumb}</span>}
        <span className={innerClassName}>{children}</span>
        {removable && !disabled && <a className={styles.tagRemoveButton} onClick={() => onRemove(id)}><SmallX/></a>}
      </span>
    );
  }
}

Tag.propTypes = {
  children: PropTypes.string.isRequired,

  /** when set to true this component is disabled  */
  disabled: PropTypes.bool,

  /** The id of the Tag  */
  id: PropTypes.string.isRequired,

  /** Callback function when removing the Tag  */
  onRemove: PropTypes.func,

  /** If the Tag is removable then it will contain a small clickable X */
  removable: PropTypes.bool,

  /** The height of the Tag */
  size: PropTypes.oneOf(['small', 'large']),

  /** theme of the Tag */
  theme: PropTypes.oneOf(['standard', 'error', 'warning']),

  /** An optional thumb to display as part of the Tag */
  thumb: PropTypes.element,

  /** wether to display elipsis (...) for long content */
  wrap: PropTypes.bool
};

Tag.defaultProps = {
  onRemove: () => {},
  size: 'small',
  removable: true,
  theme: 'standard'
};

export default Tag;
