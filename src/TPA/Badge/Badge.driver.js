import styles from './Badge.scss';

export default ({element}) => ({
  exists: () => !!element,
  isOfType: type => element.classList.contains(styles[type]),
  isOfAlignment: alignment => element.classList.contains(styles[alignment]),
  hasClass: className => {
    return element.classList.contains(className);
  },
  text: () => element.textContent
});
