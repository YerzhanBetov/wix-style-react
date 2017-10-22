import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';
import Tooltip from 'wix-style-react/Tooltip';
import {Button} from 'wix-style-react/Backoffice';

export class Template extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    theme: Tooltip.propTypes.theme,
    placement: Tooltip.propTypes.placement,
    tooltipContent: Tooltip.propTypes.content,
    showTrigger: Tooltip.propTypes.showTrigger,
    hideTrigger: Tooltip.propTypes.hideTrigger,
    type: PropTypes.oneOf(['tooltip', 'popover']),
    size: Tooltip.propTypes.size,
    onShow: Tooltip.propTypes.onShow,
    onHide: Tooltip.propTypes.onHide
  };

  componentDidUpdate(props) {
    props.onChange(this.getExampleCode());
  }

  componentDidMount() {
    this.props.onChange(this.getExampleCode());
  }

  getExampleCode() {
    return reactElementToJSXString(this.getComponent(), {
      showDefaultProps: false
    });
  }

  getComponent() {
    return (
      <Tooltip
        placement={this.props.placement}
        alignment="center"
        content={this.props.tooltipContent}
        showTrigger={this.props.showTrigger}
        hideTrigger={this.props.hideTrigger}
        theme={this.props.theme}
        size={this.props.size}
        onShow={this.props.onShow}
        onHide={this.props.onHide}
        shouldCloseOnClickOutside
        >
        {this.getTooltipTarget()}
      </Tooltip>
    );
  }

  getTooltipTarget() {
    switch (this.props.type) {
      case 'tooltip':
        return (
          <div>Hover me to see the tooltip</div>
        );
      case 'popover':
        return (
          <Button type="button">Click Me</Button>
        );
      default:
    }
  }

  render() {
    return this.getComponent();
  }
}

export default Template;

