import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import TextLinkLayout from '../../BaseComponents/TextLinkLayout';

export default class BaseTextLink extends WixComponent {

  static propTypes = {
    ...TextLinkLayout.propTypes,
    link: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    download: PropTypes.bool,
    rel: PropTypes.string,
    target: PropTypes.string,
    ariaLabel: PropTypes.string,
    color: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func
  };

  static defaultProps = {
    ...TextLinkLayout.defaultProps,
    disabled: false,
    download: false,
    rel: null,
    target: null,
    onClick: () => {}
  };

  render() {
    const {ariaLabel, disabled, link, children, download, rel, target, onMouseEnter, onMouseLeave, onClick} = this.props;
    const props = {
      download,
      href: `${link}`,
      onClick: event => disabled ? event.preventDefault() : onClick(event),
      role: 'link',
      style: {
        textDecoration: 'inherit',
        color: this.props.color ? this.props.color : 'inherit',
        tabIndex: 0,
        display: 'inline-block'
      }
    };

    if (ariaLabel) {
      props['aria-label'] = ariaLabel;
    }

    if (rel) {
      props.rel = rel;
    }

    if (target) {
      props.target = target;
    }

    if (onMouseEnter) {
      props.onMouseEnter = onMouseEnter;
    }

    if (onMouseLeave) {
      props.onMouseLeave = onMouseLeave;
    }

    return (
      <a {...props}>
        <TextLinkLayout {...this.props}>
          {children}
        </TextLinkLayout>
      </a>
    );
  }
}
