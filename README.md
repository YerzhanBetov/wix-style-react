<h1 style="text-align: center;">
    <a href="https://wix.github.com/wix-style-react">
        <img src="https://raw.githubusercontent.com/wix/wix-style-react/master/.storybook/logo.svg?sanitize=true" alt="Wix Style React" width="300">
    </a>
</h1>

`wix-style-react` is a collection of [React](https://facebook.github.io/react/) components that conform to Wix Style created by Wix UX guild.

#### [Demo](https://wix.github.io/wix-style-react) | [Source](https://github.com/wix/wix-style-react)

## Setup

* Install with `npm` or `yarn`:
```sh
npm i wix-style-react
# OR
yarn wix-style-react
```

* Use in your project:

> __Note__: ensure `body` has either `ltr` or `rtl` class (depending, of course, on the displayed language).

```jsx
import React from 'react';
import Button from 'wix-style-react/Button';

const MyComponent = () =>
  <Button onClick={() => console.log('thanks for clicking :)')}>
    Click me!
  </Button>;
```

> __Note__: `wix-style-react` works best when [Yoshi](https://github.com/wix/yoshi) is used as build tool. If you do not use it, read [here](https://wix.github.io/wix-style-react/?selectedKind=Introduction&selectedStory=Usage%20Without%20Yoshi&full=0&down=0&left=1&panelRight=0) for webpack setup instructions.

[demo page](https://wix.github.io/wix-style-react) includes all available components with their usage examples.

## Tests
Please refer the [Testing page](https://wix.github.io/wix-style-react/?selectedKind=Introduction&selectedStory=Testing&full=0&down=0&left=1&panelRight=0)

## Contributing
Please refer the [Contribution page](https://wix.github.io/wix-style-react/?selectedKind=Introduction&selectedStory=Contribution&full=0&down=0&left=1&panelRight=0)

## License
This project is offered under [MIT License](https://github.com/wix/wix-style-react/blob/master/LICENSE).
