# Usage Without Yoshi

`wix-style-react` works best when [Yoshi](https://github.com/wix/yoshi) is used as build tool.
if you do not wish or cannot use it, you can use webpack. However, at the moment additional configuration is required.


## `.babel.rc`

```json
"plugins": ["transform-decorators-legacy"],
"only": [
  "src",
  "node_modules/wix-style-react"
]
```

## Webpack Loaders

The files are brought "uncompiled" and "unpacked". You will need to
ensure webpack has some required loaders configured by adding
`node_modules/wix-style-react/src` to your loaders include array.

#### support for scss

```js
loaders: [
  {
    test: /\.scss$/,
    include: [
      path.join(__dirname, 'node_modules/wix-style-react'),
      path.join(__dirname, 'node_modules/bootstrap-sass') // only if you use Grid component
    ]
    loaders: [
      'style-loader',
      'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      'postcss-loader',
      'sass-loader'
    ]
  }
]
```

scss also requires `postcss.config.js` file with the following content:

```javascript
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};
```


#### support for jsx (Button component for example)

```js
loaders: [
  {
    test: /\.jsx?$/,
    loader: ['babel-loader'],
    include: [
      path.join(__dirname, 'node_modules/wix-style-react/src/Button')
    ]
  }
]
```

#### support for svg (required for icons)
```js
loaders: [
  {
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    loader: 'file-loader'
  }
]
```

svg also requires `images-require-hook` dependency in `package.json`:

```json
"dependencies": {
  "images-require-hook": "^1.0.3"
}
```

## Server Side Rendering

```js
require('css-modules-require-hook')({
  generateScopedName: '[path][name]__[local]__[hash:base64:5]',
  extensions: ['.scss', '.css'],
  camelCase: true
});
```

The scope name pattern has to be the same as in the `webpack.config.js` file
