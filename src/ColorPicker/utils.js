import ReactDOM from 'react-dom';

export const getBoundingRect = node => ReactDOM.findDOMNode(node).getBoundingClientRect();
