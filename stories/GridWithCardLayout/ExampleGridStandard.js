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
        <Col span={8}>
          <Card>
            <Card.Header withoutDivider subtitle="subtitle" title="Header without Divider"/>
            <Card.Content>
              <Row>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
                <Col span={3}>
                  {renderStandardInput()}
                </Col>
                <Col span={3}>
                  {renderStandardInput()}
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Card.Header title="Side Card"/>
            <Card.Content>
              <Row>
                <Col span={12}>
                  {renderStandardInput()}
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
              </Row>
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
        <Col span={12}>
          <Card>
            <Card.Header title="Main card" subtitle="Subtitle"/>
            <Card.Content>
              <Row>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>;
