const labelDriverFactory = ({element}) => {
  return {
    exists: () => !!element,
    getContent: () => element.innerHTML,
    getAttribute: attributeName => element.getAttribute(attributeName),
    hasClass: className => element.getAttribute('class').indexOf(className) > -1
  };
};

export default labelDriverFactory;
