import styles from './Breadcrumbs.scss';

const breadcrumbsDriverFactory = component => {
  const hasClass = className => component.getAttribute('class')
    .then(classes => classes.split('__').indexOf(className) !== -1);

  return {
    breadcrumbContentAt: position => component.all(by.xpath('./div')).get(position).getText(),
    clickBreadcrumbAt: position => component.$$('[data-hook="breadcrumb-clickable"]').get(position).click(),
    getActiveItemId: () => component.all(by.xpath('./div')).getAttribute('class')
      .then(classes => {
        const activeItems = classes.map(cls => cls.split(' ').some(c => styles.active === c));
        return activeItems.indexOf(true);
      }),
    isLarge: () => hasClass('large'),
    isMedium: () => hasClass('medium'),
    isOnWhiteBackground: () => hasClass('onWhiteBackground'),
    isOnGrayBackground: () => hasClass('onGrayBackground'),
    getLabelClassList: position => component.all(by.xpath('./div')).get(position).getAttribute('class'),
    click: () => component.click(),
    element: () => component
  };
};

export default breadcrumbsDriverFactory;
