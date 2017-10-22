import React from 'react';
import {Container, Row, Col, Card} from '../../src/Grid';
import styles from './ExampleGrid.scss';

import TextField from '../../src/TextField';
import Input from '../../src/Input';
import Label from '../../src/Label';
import ToggleSwitch from '../../src/ToggleSwitch';
import {Animator} from 'wix-animations';

function renderStandardInput() {
  return (
    <TextField>
      <Label
        for="textField"
        >
        Text Field
      </Label>
      <Input
        id="textField"
        placeholder="Default text goes"
        />
    </TextField>
  );
}

class ExampleGridAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: true};
  }

  render() {
    return (<div data-hook="card-example" className={styles.exampleContainer} style={{height: 1094}}>
      <div className={styles.actions}>
        <ToggleSwitch checked={this.state.show} onChange={() => this.setState({show: !this.state.show})}/> Show/Hide
        grid container
      </div>
      <Container>
        <Animator
          opacity
          sequence
          show={this.state.show}
          translate={{enter: {direction: 'top', size: '10%'}, exit: {direction: 'bottom', size: '10%'}}}
          timing="large"
          >
          <Row>
            <Col span={4}>
              <Card>
                <Card.LinkHeader linkTo="http://www.wix.com/" linkTitle="Link to Wix" title="Card with link"/>
                <Card.Content>
                  <Row>
                    <Col span={12}>
                      {renderStandardInput()}
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Card.LinkHeader linkTo="http://www.wix.com/" linkTitle="Link to Wix" title="Card with link"/>
                <Card.Content>
                  <Row>
                    <Col span={12}>
                      {renderStandardInput()}
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Card.LinkHeader linkTo="http://www.wix.com/" linkTitle="Link to Wix" title="Card with link"/>
                <Card.Content>
                  <Row>
                    <Col span={12}>
                      {renderStandardInput()}
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <Card>
                <Card.LinkHeader linkTo="http://www.wix.com/" linkTitle="Link to Wix" title="Card with link"/>
                <Card.Content>
                  <Row>
                    <Col span={12}>
                      {renderStandardInput()}
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
            <Col span={3}>
              <Card>
                <Card.LinkHeader linkTo="http://www.wix.com/" linkTitle="Link to Wix" title="Card with link"/>
                <Card.Content>
                  <Row>
                    <Col span={12}>
                      {renderStandardInput()}
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
            <Col span={3}>
              <Card>
                <Card.LinkHeader linkTo="http://www.wix.com/" linkTitle="Link to Wix" title="Card with link"/>
                <Card.Content>
                  <Row>
                    <Col span={12}>
                      {renderStandardInput()}
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
            <Col span={3}>
              <Card>
                <Card.LinkHeader linkTo="http://www.wix.com/" linkTitle="Link to Wix" title="Card with link"/>
                <Card.Content>
                  <Row>
                    <Col span={12}>
                      {renderStandardInput()}
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <Card>
                <Card.LinkHeader linkTo="http://www.wix.com/" linkTitle="Link to Wix" title="Card with link"/>
                <Card.Content>
                  <Row>
                    <Col span={12}>
                      {renderStandardInput()}
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Card.LinkHeader linkTo="http://www.wix.com/" linkTitle="Link to Wix" title="Card with link"/>
                <Card.Content>
                  <Row>
                    <Col span={12}>
                      {renderStandardInput()}
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Card.LinkHeader linkTo="http://www.wix.com/" linkTitle="Link to Wix" title="Card with link"/>
                <Card.Content>
                  <Row>
                    <Col span={12}>
                      {renderStandardInput()}
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <Card>
                <Card.LinkHeader linkTo="http://www.wix.com/" linkTitle="Link to Wix" title="Card with link"/>
                <Card.Content>
                  <Row>
                    <Col span={12}>
                      {renderStandardInput()}
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
            <Col span={3}>
              <Card>
                <Card.LinkHeader linkTo="http://www.wix.com/" linkTitle="Link to Wix" title="Card with link"/>
                <Card.Content>
                  <Row>
                    <Col span={12}>
                      {renderStandardInput()}
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
            <Col span={3}>
              <Card>
                <Card.LinkHeader linkTo="http://www.wix.com/" linkTitle="Link to Wix" title="Card with link"/>
                <Card.Content>
                  <Row>
                    <Col span={12}>
                      {renderStandardInput()}
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
            <Col span={3}>
              <Card>
                <Card.LinkHeader linkTo="http://www.wix.com/" linkTitle="Link to Wix" title="Card with link"/>
                <Card.Content>
                  <Row>
                    <Col span={12}>
                      {renderStandardInput()}
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
          </Row>
        </Animator>
      </Container>
    </div>);
  }
}



export default () =>
  <ExampleGridAnimation/>;
