import story from '../utils/Components/Story';

import component from 'wix-style-react/ColorPicker';
import source from '!raw-loader!wix-style-react/ColorPicker/color-picker';

story({
  category: 'Core',
  name: 'ColorPicker',
  source,
  component,
  componentProps: setProps => ({
    onChange: value => setProps({value})
  }),
  exampleProps: {
    onChange: ev => ev.hex()
  }
});
