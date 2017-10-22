import React from 'react';
import ButtonWithOptions from 'wix-style-react/ButtonWithOptions';
import {Close} from '../../src/Icons/dist/index';

const style = {
  display: 'inline-block',
  padding: '0 5px 0',
  width: '200px',
  lineHeight: '22px'
};

const options = [
  {id: 0, value: 'First option'},
  {id: 1, value: 'Unselectable option', unselectable: true},
  {id: 2, value: 'Third option'},
  {id: 3, value: <span style={{color: 'red'}}>Node option</span>},
  {id: 4, value: 'Very long option text jldlkasj ldk jsalkdjsal kdjaklsjdlkasj dklasj'}
];

const optionsArray = options.map(option => {
  const {value, ...props} = option;
  return <ButtonWithOptions.Option key={option.id} {...props}>{value}</ButtonWithOptions.Option>;
});

export default () =>
  <div>
    <div style={style} className="ltr">
      Left to right
      <ButtonWithOptions>
        <ButtonWithOptions.Button
          height="medium"
          theme="icon-standard"
          >
          <Close size="12px"/>
        </ButtonWithOptions.Button>
        {optionsArray}
      </ButtonWithOptions>
    </div>
  </div>;
