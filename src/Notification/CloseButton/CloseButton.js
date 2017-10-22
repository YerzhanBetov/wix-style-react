import React from 'react';
import {Button} from '../../Backoffice/';
import Close from '../../Icons/dist/components/Close';

const CloseButton = () => (
  <Button height="medium" theme="close-transparent" onClick={e => e.preventDefault()}>
    <Close size="6px"/>
  </Button>
);

CloseButton.displayName = 'Notification.CloseButton';

export default CloseButton;
