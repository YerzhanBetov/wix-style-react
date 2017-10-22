import {inputTestkitFactory, toggleSwitchTestkitFactory} from '../../../../testkit/protractor';
import {protractorTestkitFactoryCreator} from '../../../../src/test-common';

export default protractorTestkitFactoryCreator(() => ({
  get: {
    toggle: dataHook => toggleSwitchTestkitFactory({dataHook}),
    input: dataHook => inputTestkitFactory({dataHook})
  }
}));
