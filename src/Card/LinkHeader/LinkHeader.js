import React from 'react';
import {bool, node, string} from 'prop-types';
import classNames from 'classnames';
import styles from './LinkHeader.scss';
import TextLink from '../../../src/Backoffice/TextLink';
import WixComponent from '../../../src/BaseComponents/WixComponent';

class LinkHeader extends WixComponent {

  static propTypes = {
    title: node.isRequired,
    linkTitle: string.isRequired,
    linkTo: string.isRequired,
    subtitle: node,
    tooltip: node,
    withoutDivider: bool
  };

  static defaultProps = {
    subtitle: null,
    tooltip: null,
    withoutDivider: false
  };

  render() {
    const {title, subtitle, linkTitle, linkTo, withoutDivider, tooltip} = this.props;

    const headerClasses = classNames({
      [styles.headerOnlyTitle]: !subtitle,
      [styles.headerTitleSubtitle]: subtitle,
      [styles.withDivider]: !withoutDivider
    });

    const linkElement = (
      <div className={styles.link}>
        <TextLink dataHook="link" link={linkTo}>{linkTitle}</TextLink>
      </div>
    );

    const titleElement = (
      <div data-hook="title" className={styles.title}>
        {title}
      </div>
    );

    const tooltipElement = tooltip ? (
        React.cloneElement(tooltip, {}, linkElement)
      ) : null;

    const actionElement = tooltipElement ? tooltipElement : linkElement;

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

export default LinkHeader;
