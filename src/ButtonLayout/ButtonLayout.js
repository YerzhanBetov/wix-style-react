import React from 'react';
import {any, bool, oneOf} from 'prop-types';
import classNames from 'classnames';
import styles from './ButtonLayout.scss';

/**
  * General Buttons
  */
const ButtonLayout = props => {
  const {theme, hover, active, disabled, height, children, matchParent} = props;

  const className = classNames({
    [styles.button]: true,
    [styles[theme]]: true,
    [styles.hover]: hover,
    [styles.active]: active,
    [styles.disabled]: disabled,
    [styles[`height${height}`]]: height !== 'medium'
  }, children.props.className);

  const _style = Object.assign({},
    children.props.style,
    {
      height,
      display: 'inline-block'
    }
  );

  if (matchParent) {
    _style.width = '100%';
  }

  if (React.Children.count(children) === 1) {
    return React.cloneElement(
      children,
      {className, style: _style},
      <div className={styles.inner}>
        {children.props.children}
      </div>
    );
  }
};

ButtonLayout.defaultProps = {
  height: 'medium',
  theme: 'fullblue'
};

ButtonLayout.propTypes = {
  active: bool,
  children: any,
  disabled: bool,

  /** The size of the button */
  height: oneOf(['small', 'medium', 'large', 'x-large']),
  hover: bool,

  /** When true the button will match its parent width */
  matchParent: bool,

  /** The theme of the button */
  theme: oneOf([
    'transparent',
    'fullred',
    'fullgreen',
    'fullpurple',
    'emptyred',
    'emptygreen',
    'emptybluesecondary',
    'emptyblue',
    'emptypurple',
    'fullblue',
    'login',
    'emptylogin',
    'transparentblue',
    'whiteblue',
    'whiteblueprimary',
    'whitebluesecondary',
    'close-standard',
    'close-dark',
    'close-transparent',
    'icon-greybackground',
    'icon-standard',
    'icon-standardsecondary',
    'icon-white',
    'icon-whitesecondary'
  ])
};

ButtonLayout.displayName = 'ButtonLayout';

export default ButtonLayout;
