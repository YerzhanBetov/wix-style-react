import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import styles from './PopoverMenu.scss';
import Tooltip from '../Tooltip';
import Button from '../Backoffice/Button';
import Dots from '../Icons/dist/components/Dots';
import PopoverMenuItem from '../PopoverMenuItem';
import classNames from 'classnames';

class PopoverMenu extends WixComponent {

  static propTypes = {
    size: Tooltip.propTypes.size,
    placement: Tooltip.propTypes.placement,
    buttonTheme: Button.propTypes.theme,
    maxWidth: Tooltip.propTypes.maxWidth
  };

  static defaultProps = {
    size: 'normal',
    placement: 'top',
    buttonTheme: 'icon-greybackground',
    maxWidth: '378px'
  };

  render() {
    const menuItems = React.Children.map(this.props.children, (child, i) => {
      if (!child) {
        return null;
      }

      const {onClick, ...passThroughProps} = child.props;
      const onClickWithHide = () => {
        this.tooltip.hide();
        onClick();
      };
      return <PopoverMenuItem {...passThroughProps} onClick={onClickWithHide} key={i}/>;
    });

    const assertPlacement = placement => this.props.placement === placement;
    const className = classNames({
      [styles.menu]: true,
      [styles.topPlacement]: assertPlacement('top'),
      [styles.rightPlacement]: assertPlacement('right'),
      [styles.bottomPlacement]: assertPlacement('bottom'),
      [styles.leftPlacement]: assertPlacement('left')
    });

    const tooltipContent = (
      <ul className={className}>
        {menuItems}
      </ul>
    );

    return (
      <Tooltip
        ref={tooltip => {
          this.tooltip = tooltip;
        }}
        placement={this.props.placement}
        alignment="center"
        content={tooltipContent}
        showTrigger="click"
        hideDelay={0}
        hideTrigger="click"
        theme="light"
        size={this.props.size}
        maxWidth={this.props.maxWidth}
        shouldCloseOnClickOutside
        >
        <Button
          type="button"
          height="medium"
          theme={this.props.buttonTheme}
          >
          <Dots size="12px"/>
        </Button>
      </Tooltip>
    );
  }
}

export default PopoverMenu;
