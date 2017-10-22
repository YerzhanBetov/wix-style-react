export const isClassExists = (element, className) =>
  !!element && !!element.className.match(new RegExp('\\b' + className + '\\b'));
