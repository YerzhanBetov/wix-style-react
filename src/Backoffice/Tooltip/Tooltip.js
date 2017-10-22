import noop from 'lodash/noop';
import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import styles from './Tooltip.scss';
import Popper from 'popper.js';
import classNames from 'classnames';

const TooltipRefreshRate = 20;

export default class Tooltip extends WixComponent {
  static propTypes = {
    content: PropTypes.any.isRequired,
    children: PropTypes.node.isRequired,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    alignment: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),
    theme: PropTypes.oneOf(['light', 'dark', 'error']),
    showDelay: PropTypes.number,
    hideDelay: PropTypes.number,
    showTrigger: PropTypes.oneOf(['custom', 'mouseenter', 'mouseleave', 'click', 'focus', 'blur']),
    hideTrigger: PropTypes.oneOf(['custom', 'mouseenter', 'mouseleave', 'click', 'focus', 'blur']),
    active: PropTypes.bool,
    arrowPlacement: PropTypes.string,
    arrowStyle: PropTypes.object,
    moveBy: PropTypes.object,
    disabled: PropTypes.bool,
    maxWidth: PropTypes.string,
    zIndex: PropTypes.number,
    textAlign: PropTypes.string,
    moveArrowTo: PropTypes.number,
    targetStyle: PropTypes.any,
    bounce: PropTypes.bool,
    shouldCloseOnClickOutside: PropTypes.bool,
    onClickOutside: PropTypes.func,
    onShow: PropTypes.func,
    size: PropTypes.oneOf(['normal', 'large'])
  };

  static defaultProps = {
    placement: 'top',
    theme: 'light',
    showDelay: 200,
    hideDelay: 500,
    showTrigger: 'mouseenter',
    hideTrigger: 'mouseleave',
    active: false,
    moveBy: {x: 0, y: 0},
    disabled: false,
    maxWidth: '1200px',
    zIndex: 2000,
    textAlign: 'center',
    onClickOutside: noop,
    onShow: noop,
    size: 'normal'
  };

  constructor(props) {
    super(props);

    this.placementFlipMap = {top: 'bottom', left: 'right', right: 'left', bottom: 'top'};
    this.alignmentMap = {top: 'start', right: 'end', bottom: 'end', left: 'start', center: ''};

    this.state = {
      placement: this.getPopperPlacement(props.placement, props.alignment),
      active: props.active
    };

    this.handlePopperUpdate = this.handlePopperUpdate.bind(this);
    this.handleHideTrigger = this.handleHideTrigger.bind(this);
    this.handleShowTrigger = this.handleShowTrigger.bind(this);
  }

  componentElements() {
    return [this.refs.target.children[0], this.refs.content.children[0]];
  }

  componentDidMount() {
    super.componentDidMount();

    const {placement} = this.state;
    const target = this.refs.target.children[0];
    const content = this.refs.content.children[0];

    this.popper = new Popper(target, content, {
      placement,
      modifiers: {
        applyStyle: {enabled: false}
      },
      onUpdate: this.handlePopperUpdate,
      onCreate: this.handlePopperUpdate
    });
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.popper.destroy();
    clearInterval(this.scheduleInterval);
  }

  componentWillReceiveProps(nextProps) {
    this.handleNextActive(nextProps);
    this.handleNextMoveBy(nextProps);
  }

  //Schedule popper updates periodically, only when the tooltip is visible (for
  //tooltip repositioning - e.g. when the target dimensions change).
  componentDidUpdate() {
    if (this.state.active && !this.scheduleInterval) {
      this.scheduleInterval = setInterval(() => {
        this.popper.scheduleUpdate();
      }, TooltipRefreshRate);

      this.props.onShow();
    } else if (!this.state.active) {
      clearInterval(this.scheduleInterval);
      this.scheduleInterval = null;
    }
  }

  onClickOutside(e) {
    if (this.props.shouldCloseOnClickOutside) {
      this.hide();
    } else {
      this.props.onClickOutside(e);
    }
  }

  hide() {
    this.toggleActive(false);
  }

  toggleActive(active) {
    this.setState({active});
  }

  handleNextMoveBy(nextProps) {
    const hasChanged = nextProps.moveBy.x !== this.props.moveBy.x ||
                       nextProps.moveBy.y !== this.props.moveBy.y;

    if (hasChanged) {
      this.moveBy = nextProps.moveBy;
      this.popper.update();
    }
  }

  handleNextActive(nextProps) {
    const {active: nextActive} = nextProps;
    const {active: currentlyActive} = this.props;

    if (nextProps.showTrigger === 'custom' && nextActive && !currentlyActive) {
      this.toggleActive(true);
    } else if (nextProps.hideTrigger === 'custom' && !nextActive && currentlyActive) {
      this.toggleActive(false);
    }
  }

  handlePopperUpdate(data) {
    const hasChangedPlacement = data.placement !== this.state.placement;

    if (hasChangedPlacement) {
      this.setState({
        placement: data.placement
      });
    }

    this.setState({popperData: data});
  }

  handleTrigger(originalCallback = noop, triggerType) {
    const {showTrigger, hideTrigger} = this.props;
    const {active} = this.state;

    if (showTrigger === hideTrigger && showTrigger === triggerType) {
      if (active) {
        this.handleHideTrigger();
      } else {
        this.handleShowTrigger();
      }
    } else if (showTrigger === triggerType) {
      this.handleShowTrigger();
    } else if (hideTrigger === triggerType) {
      this.handleHideTrigger();
    }

    originalCallback();
  }

  handleHideTrigger() {
    this.handleToggleWithDelay(false);
  }

  handleShowTrigger() {
    this.handleToggleWithDelay(true);
  }

  handleToggleWithDelay(toggle) {
    clearTimeout(this.mouseTimeout);

    this.mouseTimeout = setTimeout(() => {
      this.toggleActive(toggle);
    }, toggle ? this.props.showDelay : this.props.hideDelay);
  }

  getPopperPlacement(placement, alignment) {
    const popperAlignment = this.alignmentMap[alignment];

    if (alignment) {
      return `${placement}-${popperAlignment}`;
    }

    return placement;
  }

  getArrowPlacement(popperPlacement) {
    const overrideArrowPlacement = this.props.arrowPlacement;
    return overrideArrowPlacement || this.placementFlipMap[popperPlacement];
  }

  placementWithoutAlignment(placement) {
    return placement.replace(/-.*/, '');
  }

  getPopperStyle() {
    const data = this.state.popperData;

    if (!data) {
      return {};
    }

    const left = Math.round(data.offsets.popper.left);
    const top = Math.round(data.offsets.popper.top);

    const transform = `translate3d(${left}px, ${top}px, 0)`;

    return {
      position: data.offsets.popper.position,
      transform,
      WebkitTransform: transform,
      left: this.props.moveBy.x,
      top: this.props.moveBy.y
    };
  }

  getArrowStyle() {
    const {moveArrowTo, arrowStyle} = this.props;
    const placement = this.placementWithoutAlignment(this.props.placement);
    const isVertical = placement === 'top' || placement === 'bottom';
    const isHorizontal = placement === 'left' || placement === 'right';

    if (moveArrowTo) {
      const repositionStyle = {};

      if (isVertical) {
        if (moveArrowTo > 0) {
          repositionStyle.left = moveArrowTo;
          repositionStyle.right = 'inherit';
        } else {
          repositionStyle.right = -1 * moveArrowTo;
          repositionStyle.left = 'inherit';
        }
      } else if (isHorizontal) {
        if (moveArrowTo > 0) {
          repositionStyle.top = moveArrowTo;
          repositionStyle.bottom = 'inherit';
        } else {
          repositionStyle.bottom = -1 * moveArrowTo;
          repositionStyle.top = 'inherit';
        }
      }

      return {
        ...repositionStyle,
        ...arrowStyle
      };
    }

    return arrowStyle;
  }

  render() {
    const {theme, bounce, disabled, maxWidth, zIndex, textAlign, size, targetStyle} = this.props;
    const placement = this.placementWithoutAlignment(this.state.placement);
    const arrowPlacement = this.getArrowPlacement(placement);

    let {active} = this.state;

    active = active && !disabled;

    const clonedTarget = React.cloneElement(this.props.children, {
      onMouseEnter: () => this.handleTrigger(this.props.children.props.onMouseEnter, 'mouseenter'),
      onMouseLeave: () => this.handleTrigger(this.props.children.props.onMouseLeave, 'mouseleave'),
      onClick: () => this.handleTrigger(this.props.children.props.onClick, 'click'),
      onFocus: () => this.handleTrigger(this.props.children.props.onFocus, 'focus'),
      onBlur: () => this.handleTrigger(this.props.children.props.onBlur, 'blur')
    });

    const popperStyle = this.getPopperStyle();
    const arrowStyle = this.getArrowStyle();

    return (
      <div className={styles.root} style={targetStyle}>
        <div ref="target" data-hook="target" className="targetWrapper">
          {clonedTarget}
        </div>
        <div ref="content">
          <div
            className={classNames(styles.tooltip, {
              [styles.active]: active
            })}
            style={{zIndex, ...popperStyle}}
            data-hook="tooltip"
            >
            <div
              className={classNames({
                [styles[`bounce-on-${arrowPlacement}`]]: bounce
              })}
              >
              <div
                className={classNames(styles.tooltipInner, styles[theme], styles[placement], styles[size], {
                  [styles.active]: active
                })}
                style={{maxWidth}}
                data-hook="tooltip-inner"
                >
                <div data-hook="tooltip-content" style={{textAlign}}>
                  {this.props.content}
                </div>
                <div
                  className={classNames(styles.arrow, styles[arrowPlacement])}
                  style={arrowStyle}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
