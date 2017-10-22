import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';

import FieldWithSelection from '../../src/Composite/FieldWithSelectionComposite/FieldWithSelectionComposite';
import Input from '../../src/Input';
import Checkbox from '../../src/Checkbox';
import Label from '../../src/Label';
import Dropdown from '../../src/Dropdown';
import RadioGroup from '../../src/RadioGroup';

import typography, {convertFromUxLangToCss} from '../../src/Typography';

const options = [
  {id: 1, value: '1'},
  {id: 2, value: '2'}
];

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonValue: 0,
      checkboxValue: false
    };
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    withLabel: PropTypes.bool,
    label: PropTypes.object,
    fieldInput: PropTypes.object,
    selectionInput: PropTypes.object,
    firstButtonLabel: PropTypes.string,
    secondButtonLabel: PropTypes.string,
    required: PropTypes.bool,
    info: PropTypes.string,
    error: PropTypes.Error,
    disabled: PropTypes.bool
  };

  componentDidUpdate(props) {
    props.onChange(reactElementToJSXString(this.getComponent()));
  }

  componentDidMount() {
    this.props.onChange(reactElementToJSXString(this.getComponent()));
  }

  getComponent() {
    let selectionInput = '';
    switch (this.props.selectionInput) {
      case 'checkbox':
        selectionInput = (
          <Checkbox
            size="medium"
            checked={this.state.checkboxValue}
            onChange={e => this.setState({checkboxValue: e.target.checked})}
            >
            <span className={typography[convertFromUxLangToCss('T3.1')]}>
              Test
            </span>
          </Checkbox>
        );
        break;
      case 'dropdown':
        selectionInput = <Dropdown options={options} dropDirectionUp size="normal" selectedId={1}/>;
        break;
      case 'buttons':
        selectionInput = (
          <RadioGroup
            display="horizontal"
            type="button"
            value={this.state.buttonValue}
            onChange={value => this.setState({buttonValue: value})}
            >
            <RadioGroup.Radio value={1} disabled={this.props.disabled}>{this.props.firstButtonLabel}</RadioGroup.Radio>
            <RadioGroup.Radio value={0} disabled={this.props.disabled}>{this.props.secondButtonLabel}</RadioGroup.Radio>
          </RadioGroup>
        );
        break;
      default:
        throw new Error('selectionInput type does not exist, please see FieldWithSelection component for more details');
    }

    return (
      <FieldWithSelection error={this.props.error} disabled={this.props.disabled} required={this.props.required} info={this.props.info}>
        {this.props.withLabel ? <Label {...this.props.label}/> : null}
        <Input {...this.props.fieldInput}/>
        {selectionInput}
      </FieldWithSelection>
    );
  }

  render() {
    return this.getComponent();
  }
}
