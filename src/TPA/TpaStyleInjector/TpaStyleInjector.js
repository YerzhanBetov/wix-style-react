import React from 'react';

function tpaStyleInjector(Component, styles) {
  const displayName = Component.displayName;
  if (!displayName) {
    throw 'Component must have a displayName';
  }

  const styleSheetId = `wix-style-react-${displayName}`;

  class TpaStyleInjector extends React.Component {
    componentDidMount() {
      if (styles && typeof styles.toString === 'function') {
        if (!document.querySelector(`style[${styleSheetId}]`)) {
          const style = document.createElement('style');
          style.setAttribute('wix-style', '');
          style.setAttribute(styleSheetId, true);
          style.innerText = styles.toString().replace(/"{{/g, '{{').replace(/}}"/g, '}}');
          document.head.insertBefore(style, document.head.firstChild);
        }
      }
    }

    render() {
      return <Component {...this.props} injectedStyles={(styles && styles.locals) ? Object.assign({}, styles.locals) : {}}/>;
    }
  }

  TpaStyleInjector.displayName = `TpaStyleInjector(${displayName})`;

  return TpaStyleInjector;
}

export default tpaStyleInjector;
