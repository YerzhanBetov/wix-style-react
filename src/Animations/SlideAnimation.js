import React, {Component} from 'react';
import {node, bool, oneOf} from 'prop-types';
import {CSSTransition} from 'react-transition-group';
import slideIn from './SlideInAnimation.scss';
import slideOut from './SlideOutAnimation.scss';

export const SlideDirection = {
  in: 'in',
  out: 'out'
};

const animationDuration = 300; // Synced with SlideAnimation.scss file

class SlideAnimation extends Component {
  render() {
    const {isVisible, animateAppear, animateEnter, animateLeave, children, direction} = this.props;
    const transitionNames = direction === SlideDirection.in ? slideIn : slideOut;
    const childTimeout = {
      enter: animateEnter ? animationDuration : 0,
      exit: animateLeave ? animationDuration : 0
    };

    return (
      <CSSTransition
        in={isVisible}
        appear={animateAppear}
        exit={animateLeave}
        classNames={transitionNames}
        timeout={childTimeout}
        unmountOnExit
        >
        {children || <span/>}
      </CSSTransition>
    );
  }
}

SlideAnimation.propTypes = {
  isVisible: bool.isRequired,
  direction: oneOf([
    SlideDirection.in,
    SlideDirection.out
  ]),
  animateAppear: bool,
  animateEnter: bool,
  animateLeave: bool,
  children: node
};

SlideAnimation.defaultProps = {
  direction: SlideDirection.in,
  animateAppear: true,
  animateEnter: true,
  animateLeave: true,
  children: null
};

export default SlideAnimation;
