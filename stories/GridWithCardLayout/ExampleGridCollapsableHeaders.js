import React from 'react';
import {Container, Row, Col, Card} from '../../src/Grid';
import styles from './ExampleGrid.scss';

import TextField from '../../src/TextField';
import Input from '../../src/Input';
import Label from '../../src/Label';

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

export default () =>
  <div data-hook="card-example" className={styles.exampleContainer}>
    <Container>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={6}>
              <Card>
                <Card.CollapsedHeader title="Card with collpaed header">
                  <Card.Content>
                    <Row>
                      <Col span={12}>
                        {renderStandardInput()}
                      </Col>
                    </Row>
                  </Card.Content>
                </Card.CollapsedHeader>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Card.CollapsedHeader title="Card with collpaed header" subtitle="and subtitle" toggleStyle="button">
                  <Card.Content>
                    <Row>
                      <Col span={6}>
                        {renderStandardInput()}
                      </Col>
                    </Row>
                  </Card.Content>
                </Card.CollapsedHeader>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Card>
                <Card.CollapsedHeader title="Card with collpaed header" subtitle="and subtitle, no divider" withoutDivider>
                  <Card.Content>
                    <Row>
                      <Col span={12}>
                        {renderStandardInput()}
                      </Col>
                    </Row>
                  </Card.Content>
                </Card.CollapsedHeader>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </div>;
