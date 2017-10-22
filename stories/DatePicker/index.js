import moment from 'moment';
import story from '../utils/Components/Story';

import readme from '../../src/DatePicker/README.md';
import source from '!raw-loader!wix-style-react/DatePicker/DatePicker';
import component from 'wix-style-react/DatePicker';
import readmeTestkit from '../../src/DatePicker/README.TESTKIT.md';

story({
  category: 'Core',
  name: 'DatePicker',
  readme,
  readmeTestkit,
  source,
  component,
  componentProps: setProps => ({
    onChange: value => setProps({value}),
    dateFormat: 'YYYY/MM/DD',
    dataHook: 'storybook-datepicker',
    value: moment('2017/01/01')
  }),
  exampleProps: {
    onChange: ev => moment(ev).format('YYYY/MM/DD')
  }
});
