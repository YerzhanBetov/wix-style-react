const inputDriverFactory = ({element}) => {
  return {
    exists: () => !!element,
    getValue: () => element.value,
    hasClass: className => element.getAttribute('class').indexOf(className) > -1
  };
};

export default inputDriverFactory;
