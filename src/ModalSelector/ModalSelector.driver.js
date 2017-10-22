import ReactTestUtils from 'react-dom/test-utils';

const modalSelectorDriverFactory = () => {

  const getPortal = () => document.body.querySelector('.portal');
  const getCloseButton = () => document.body.querySelector('[data-hook="header-close-button"]');
  const getCancelButton = () => document.body.querySelector('[data-hook="cancellation-button"]');
  const getOkButton = () => document.body.querySelector('[data-hook="confirmation-button"]');
  const getContent = () => document.body.querySelector('.ReactModal__Content');

  return {
    exists: () => !!(getPortal()),
    isOpen: () => !!(getContent()),
    isOkEnabled: () => !getOkButton().disabled,
    getChildBySelector: selector => getPortal().querySelector(selector),
    clickOnClose: () => {
      ReactTestUtils.Simulate.click(getCloseButton());
    },
    clickOnOk: () => {
      ReactTestUtils.Simulate.click(getOkButton());
    },
    clickOnCancel: () => {
      ReactTestUtils.Simulate.click(getCancelButton());
    }
  };
};

export default modalSelectorDriverFactory;
