import styles from './Badge.scss';
import typography from '../Typography';

const hasClass = (element, styles, cls) => {
  const normalized = cls.toLowerCase().replace('.', '_');
  return element.getAttribute('class').then(classes => classes.split(' ').some(c => styles[normalized] === c));
};

export default component => ({
  element: () => component,
  isBadge: () => hasClass(component, styles, 'badge'),
  isOfType: type => hasClass(component, styles, type),
  isOfAppearance: appearance => hasClass(component, typography, appearance),
  isOfAlignment: alignment => hasClass(component, styles, alignment),
  isOfShape: shape => hasClass(component, styles, shape),
  text: () => component.getText()
});
