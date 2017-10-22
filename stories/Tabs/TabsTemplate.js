import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';
import Tabs from '../../src/Tabs';

const items = [{id: 1, title: 'First item'}, {id: 2, title: 'Second item'}, {id: 3, title: 'Third item'}];

class TabsTemplate extends Component {
  state = {
    activeId: items[0].id
  };

  componentDidUpdate(props) {
    props.onChange(getExampleCode(this.getComponent()));
  }

  componentDidMount() {
    this.props.onChange(getExampleCode(this.getComponent()));
  }

  getComponent() {
    const {activeId} = this.state;
    const {type, hasDivider, width} = this.props;
    const props = {items, activeId, hasDivider};

    if (type) {
      props.type = type;
    }

    if (type === 'uniformSide' && width) {
      props.width = width;
    }

    return <Tabs onClick={({id}) => this.setState({activeId: id})} {...props}/>;
  }

  render() {
    return this.getComponent();
  }
}

TabsTemplate.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Tabs.tabTypes),
  hasDivider: PropTypes.bool,
  width: PropTypes.string
};

function getExampleCode(element) {
  return reactElementToJSXString(element, {
    filterProps: ['onClick'],
    showDefaultProps: false
  });
}

export default TabsTemplate;
