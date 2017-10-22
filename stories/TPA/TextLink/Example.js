import React from 'react';
import TextLink from '../../../src/TPA/TextLink';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '140px',
  lineHeight: '22px'
};

function Example() {
  return (
    <div>
      <div className="ltr" style={style}>
        <TextLink link="https://wix.github.io/wix-style-react/?selectedKind=Introduction&selectedStory=Getting%20started&full=0&down=0&left=1&panelRight=0" data-hook="story-text-link">Click me</TextLink>
      </div>
    </div>
  );
}

export default Example;
