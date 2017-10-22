const floatingTabItemDriverFactory = ({element}) => {

  return {
    exists: () => !!element,
    isActive: () => element.getAttribute('class') === 'active',
    content: () => element.textContent
  };
};

export default floatingTabItemDriverFactory;
