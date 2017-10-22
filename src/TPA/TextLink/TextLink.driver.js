import ReactTestUtils from 'react-dom/test-utils';

const TextLinkDriverFactory = ({element}) => {
  return {
    exists: () => !!element,
    click: () => {
      try {
        ReactTestUtils.Simulate.click(element);
      } catch (e) {
        element.simulate('click');
      }
    },
    getTextContent: () => element.textContent
  };
};

export default TextLinkDriverFactory;
