import React from 'react';
import {bool, func, node, oneOf, string} from 'prop-types';
import styles from './ButtonHeader.scss';
import classNames from 'classnames';
import Button from '../../../src/Backoffice/Button';
import WixComponent from '../../BaseComponents/WixComponent';

class ButtonHeader extends WixComponent {

  static propTypes = {
    title: node.isRequired,
    buttonTitle: string.isRequired,
    buttonOnClick: func.isRequired,
    buttonPrefix: node,
    buttonSuffix: node,
    subtitle: node,
    tooltip: node,
    theme: oneOf([
      'standard',
      'fullblue'
    ]),
    withoutDivider: bool
  };

  static defaultProps = {
    subtitle: null,
    withoutDivider: false,
    buttonPrefix: null,
    tooltip: null,
    theme: 'standard',
    buttonSuffix: null
  };

  render() {
    const {title, subtitle, buttonOnClick, buttonTitle, buttonPrefix, buttonSuffix, withoutDivider, tooltip, theme} = this.props;

    const headerClasses = classNames({
      [styles.headerOnlyTitle]: !subtitle,
      [styles.headerTitleSubtitle]: subtitle,
      [styles.withDivider]: !withoutDivider
    });

    const buttonClass = classNames({
      [styles.button]: theme === 'standard',
      [styles.buttonSmall]: theme === 'fullblue'
    });

    const height = theme === 'standard' ? 'medium' : 'small';
    const buttonTheme = theme === 'standard' ? 'whiteblueprimary' : 'fullblue';

    const buttonElement = (
      <div className={buttonClass}>
        <Button
          dataHook="button"
          height={height}
          suffixIcon={buttonSuffix}
          prefixIcon={buttonPrefix}
          onClick={buttonOnClick}
          theme={buttonTheme}
          >
          {buttonTitle}
        </Button>
      </div>
    );

    const tooltipElement = tooltip ? (
        React.cloneElement(tooltip, {}, buttonElement)
      ) : null;

    const actionElement = tooltipElement ? tooltipElement : buttonElement;

    const titleElement = (
      <div data-hook="title" className={styles.title}>
        {title}
      </div>
    );

    const subtitleElement = subtitle ? (
      <div data-hook="subtitle" className={styles.subtitle}>
        {this.props.subtitle}
      </div>
    ) : null;

    return (
      <div className={headerClasses}>
        <div>
          {titleElement}
          {subtitleElement}
        </div>
        {actionElement}
      </div>
    );
  }
}

export default ButtonHeader;
