import React from 'react';
import {object, bool, func} from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';
import Tabs from '../Tabs';
import ColorPickerConverterHex from './color-picker-converter-hex';
import ColorPickerConverterRgb from './color-picker-converter-rgb';
import ColorPickerConverterHsb from './color-picker-converter-hsb';

const HEX = 'HEX';
const RGB = 'RGB';
const HSB = 'HSB';

const tabs = [
  {id: HEX, title: HEX},
  {id: RGB, title: RGB},
  {id: HSB, title: HSB}
];

export default class ColorPickerConverter extends WixComponent {

  static propTypes = {
    current: object.isRequired,
    showConverter: bool.isRequired,
    showInput: bool.isRequired,
    onChange: func.isRequired
  }

  state = {
    activeTab: HEX
  }

  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
  }

  render() {
    const {current, showConverter, showInput} = this.props;

    if (!showConverter && !showInput) {
      return null;
    }

    if (!showConverter) {
      return <ColorPickerConverterHex current={current} onChange={this.props.onChange}/>;
    }

    const {activeTab} = this.state;

    return (
      <div>
        <Tabs items={tabs} activeId={activeTab} onClick={this.changeTab}/>
        {activeTab === HEX && <ColorPickerConverterHex current={current} onChange={this.props.onChange}/>}
        {activeTab === RGB && <ColorPickerConverterRgb current={current} onChange={this.props.onChange}/>}
        {activeTab === HSB && <ColorPickerConverterHsb current={current} onChange={this.props.onChange}/>}
      </div>
    );
  }

  changeTab({id}) {
    this.setState({activeTab: id});
  }

}
