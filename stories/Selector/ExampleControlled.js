import React, {Component} from 'react';
import Selector from '../../src/Selector';
import {Container, Row, Col, Card} from '../../src/Grid';
import TextField from '../../src/TextField';
import Checkbox from '../../src/Checkbox';
import Label from '../../src/Label';
import Dropdown from '../../src/Dropdown';
import Input from '../../src/Input';
import RadioGroup from '../../src/RadioGroup';
import Image from '../../src/Selector/Image';
import * as styles from './ExampleStandard.scss';

const toggleTypes = ['checkbox', 'radio'];
const extraTypes = ['none', 'text', 'icon', 'progress'];

class ControlledSelector extends Component {

  constructor() {
    super();

    this.state = {
      id: 1,
      title: 'Title',
      hasSubtitle: true,
      subtitle: 'Subtitle',
      selected: false,
      hasImage: true,
      imageSrc: 'http://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY=',
      imageSize: 3,
      extra: extraTypes[0],
      toggle: toggleTypes[0]
    };
  }

  render() {
    return (
      <form className={styles.container}>
        <Container>
          <Row>
            <Col span={7}>
              <Card>
                <Card.Header title="Controls"/>
                <Card.Content>
                  <Row>
                    <Col span={3}>
                      <TextField>
                        <Label>Title</Label>
                        <Input
                          size="small"
                          value={this.state.title}
                          onChange={e => this.setState({title: e.target.value})}
                          />
                      </TextField>
                    </Col>
                    <Col span={3}>
                      <div className={styles.label}>
                        <Checkbox checked={this.state.hasSubtitle} onChange={() => this.setState({hasSubtitle: !this.state.hasSubtitle})}>
                          Subtitle
                        </Checkbox>
                      </div>
                      <Input
                        size="small"
                        value={this.state.subtitle}
                        disabled={!this.state.hasSubtitle}
                        onChange={e => this.setState({subtitle: e.target.value})}
                        />
                    </Col>
                    <Col span={3}>
                      <div className={styles.label}>
                        <Checkbox checked={this.state.hasImage} onChange={() => this.setState({hasImage: !this.state.hasImage})}>
                          Image
                        </Checkbox>
                      </div>
                      <Dropdown
                        size="small"
                        selectedId={this.state.imageSize}
                        options={Image.types.map((type, index) => ({id: index, value: type}))}
                        disabled={!this.state.hasImage}
                        onSelect={({id}) => this.setState({imageSize: id})}
                        />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <div className={styles.label}><Label>Toggle Type</Label></div>
                      <RadioGroup
                        value={this.state.toggle}
                        display="horizontal"
                        onChange={toggle => this.setState({toggle})}
                        >
                        {toggleTypes.map((type, index) => <RadioGroup.Radio key={index} value={type}>{type}</RadioGroup.Radio>)}
                      </RadioGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <div className={styles.label}><Label>Extra</Label></div>
                      <RadioGroup
                        value={this.state.extra}
                        display="horizontal"
                        onChange={extra => this.setState({extra})}
                        >
                        {extraTypes.map((type, index) => <RadioGroup.Radio key={index} value={type}>{type}</RadioGroup.Radio>)}
                      </RadioGroup>
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
            <Col span={5}>
              <Card>
                <Card.Header title="Preview"/>
                <Card.Content>
                  <Selector
                    title={this.state.title}
                    id={this.state.id}
                    subTitle={this.state.hasSubtitle ? this.state.subtitle : ''}
                    imageSrc={this.state.hasImage ? this.state.imageSrc : ''}
                    imageSize={Image.types[this.state.imageSize]}
                    isSelected={this.state.selected}
                    toggleType={this.state.toggle}
                    onToggle={this.selectorToggle}
                    >
                    {this.state.extra === 'text' ? <Selector.ExtraText text="Extra Text"/> : ''}
                    {this.state.extra === 'icon' ? <Selector.ExtraIcon name="Add"/> : ''}
                    {this.state.extra === 'progress' ? <Selector.ProgressBar progress={83}/> : ''}
                  </Selector>
                </Card.Content>
              </Card>
            </Col>
          </Row>
        </Container>
      </form>
    );
  }
}

export default () =>
  <div>
    <ControlledSelector/>
  </div>;
