import $ from 'jquery';
import tooltipDriverFactory from '../../src/Tooltip/Tooltip.driver';

const fieldLabelAttributesDriverFactory = ({element, wrapper}) => {
  return {
    exists: () => !!element,
    getTooltipTestKit: () => tooltipDriverFactory({wrapper, element: $(element).find('[data-hook="info"]')}),
    hasRequired: () => !!$(element).find('[data-hook="required"]').length,
    hasInfo: () => !!$(element).find('[data-hook="info"]').length
  };
};

export default fieldLabelAttributesDriverFactory;
