import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Backoffice/Button';
import TextLink from '../../Backoffice/TextLink';

const ActionButton = ({children, onClick, type, link}) => {
  const commonProps = {
    dataHook: 'notification-cta-button',
    onClick: e => onClick(e)
  };

  if (type === 'textLink') {
    return (
      <TextLink underlineStyle="always" darkBackground link={link} {...commonProps} >
        {children}
      </TextLink>
    );
  } else {
    return (
      <Button height="small" theme="transparent" {...commonProps}>
        {children}
      </Button>
    );
  }
};

ActionButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  link: PropTypes.string,
  type: PropTypes.string
};

ActionButton.defaultProps = {
  onClick: e => e.preventDefault(),
  type: 'button'
};

ActionButton.displayName = 'Notification.ActionButton';

export default ActionButton;
