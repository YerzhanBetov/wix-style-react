import React from 'react';
import {Container, AutoAdjustedRow, Card} from '../../src/Grid';
import styles from './ExampleGrid.scss';

import {Plus} from 'wix-style-react/Icons';
import Tooltip from '../../src/Tooltip';

export default () =>
  <div data-hook="card-example" className={styles.exampleContainer}>
    <Container>
      <AutoAdjustedRow>
        <Card stretchVertically>
          <Card.ButtonHeader
            tooltip={<Tooltip placement="top" alignment="center" content="Hi there!"/>}
            title="Stretched Card 1"
            buttonOnClick={() => {
              alert('Clicked!');
            }}
            buttonPrefix={<Plus/>}
            buttonTitle="Tooltip button!"
            />
          <Card.Content>Here comes some AMAZING content that will blow your mind.
            Or just show you that the card next to me got my height.</Card.Content>
        </Card>
        <Card stretchVertically>
          <Card.ButtonHeader
            tooltip={<Tooltip placement="top" alignment="center" content="Hi there!"/>}
            title="Stretched Card 2"
            buttonOnClick={() => {
              alert('Clicked!');
            }}
            buttonPrefix={<Plus/>}
            buttonTitle="Tooltip button!"
            />
        </Card>
      </AutoAdjustedRow>
      <AutoAdjustedRow>
        <Card>
          <Card.Header
            title="Card 1"
            />
        </Card>
        <Card>
          <Card.Header
            title="Card 2"
            />
        </Card>
        <Card>
          <Card.Header
            title="Card 3"
            />
        </Card>
        <Card>
          <Card.Header
            title="Card 4"
            />
        </Card>

      </AutoAdjustedRow>
    </Container>
  </div>;
