import styles from './ToggleSwitch.scss';

const toggleSwitchDriverFactory = component => ({
  click: () => component.click(),
  element: () => component,
  checked: () => component.$('input').isSelected(),
  isXSmall: () => component.getAttribute('class').then(classes => classes.includes(styles.toggleSwitchXSmall)),
  isSmall: () => component.getAttribute('class').then(classes => classes.includes(styles.toggleSwitchSmall)),
  isLarge: () => component.getAttribute('class').then(classes => !classes.includes(styles.toggleSwitchSmall) && !classes.includes(styles.toggleSwitchXSmall))
});

export default toggleSwitchDriverFactory;
