import React from 'react';
import {node, bool} from 'prop-types';
import NavigationLinkLayout from '../core/navigation/LinkLayout';
class Link extends React.Component {
  render() {
    const {children, isActive, ...rest} = this.props;

    return (
      <NavigationLinkLayout isActive={isActive} {...rest}>
        {children}
      </NavigationLinkLayout>
    );
  }
}

Link.defaultProps = {
  isActive: false
};

Link.propTypes = {
  children: node.isRequired,
  isActive: bool
};

export default Link;
