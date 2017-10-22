import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '../../src/RadioGroup';
import Label from '../../src/Label';
import Input from '../../src/Input';
import TabsTemplate from './TabsTemplate';
import styles from './TabsExample.scss';
import TextField from '../../src/TextField';

class TabsExample extends Component {
  state = {
    type: '',
    hasDivider: true,
    width: 30
  };

  render() {
    return (
      <div>
        <div className={styles.controlGroup}>
          <Label>Type</Label>
          <div className={styles.radioGroup}>
            <RadioGroup
              display="horizontal"
              value={this.state.type}
              onChange={type => this.setState({type})}
              >
              <RadioGroup.Radio value="">Default</RadioGroup.Radio>
              <RadioGroup.Radio value="compact">Compact</RadioGroup.Radio>
              <RadioGroup.Radio value="uniformSide">Uniform (Side)</RadioGroup.Radio>
              <RadioGroup.Radio value="uniformFull">Uniform (Full)</RadioGroup.Radio>
            </RadioGroup>
          </div>
        </div>
        {
          this.state.type === 'uniformSide' ?
            <div className={styles.option}>
              <div className={styles.column} style={{width: '100px'}}>
                <br/>
                <TextField>
                  <Label
                    appearance="T1.1"
                    for="firstName"
                    >
                    Tab Width
                  </Label>
                  <Input
                    errorMessage=""
                    id="firstName"
                    placeholder="e.g. 100"
                    size="normal"
                    onChange={e => this.setState({width: e.target.value})}
                    value={this.state.width}
                    suffix={
                      <Input.Group>
                        <Input.Unit value="px"/>
                        <Input.Ticker
                          onDown={() => {
                            this.setState({width: (this.state.width - 1)});
                          }}
                          onUp={() => {
                            this.setState({width: (this.state.width + 1)});
                          }}
                          />
                      </Input.Group>}
                    theme="normal"
                    type="number"
                    />
                </TextField>
                <br/>
              </div>
            </div> :
            null
        }
        <div className={styles.controlGroup}>
          <Label>Divider</Label>
          <div className={styles.radioGroup}>
            <RadioGroup
              display="horizontal"
              value={this.state.hasDivider}
              onChange={hasDivider => this.setState({hasDivider})}
              >
              <RadioGroup.Radio value>Visible</RadioGroup.Radio>
              <RadioGroup.Radio value={false}>Hidden</RadioGroup.Radio>
            </RadioGroup>
          </div>
        </div>
        <div className={styles.preview}>
          <TabsTemplate
            onChange={this.props.onChange}
            type={this.state.type}
            hasDivider={this.state.hasDivider}
            width={this.state.width}
            />
        </div>
      </div>
    );
  }
}

TabsExample.propTypes = {
  onChange: PropTypes.func
};

export default TabsExample;
