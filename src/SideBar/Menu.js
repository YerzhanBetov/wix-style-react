import redStyle from './MenuRed.scss';
import blueStyle from './MenuBlue.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const findChildIndex = (children, selectedId) => {
  for (let i = 0; i < children.length; i++) {
    if (children[i].id === selectedId) {
      return i;
    }
  }

  return -1;
};

class Menu extends React.Component {

  getCss() {
    if (this.props.selectedColor && this.props.selectedColor === 'blue') {
      return blueStyle;
    } else {
      return redStyle;
    }
  }

  render() {
    const {items, selectedId, onSelect = () => {}} = this.props;

    return (
      <div>
        {items.map(item => this._renderItem({item, selectedId, onSelect}))}
      </div>
    );
  }

  _renderItem({item, selectedId, onSelect}) {
    if (item.children) {
      return this._renderGroup({item, selectedId, onSelect});
    } else {
      return this._renderSelection({item, selectedId, onSelect});
    }
  }

  _renderGroup({item, selectedId, onSelect}) {

    const {title, children, id} = item;

    const selectedChild = findChildIndex([...children], selectedId);
    const selected = selectedId === id || selectedChild > -1;

    const height = !selected ? 0 : ((children.length * 48) - 18);  /* 48 is item height, 18 is last item margin */
    const top = !selected ? 0 : (selectedChild * 42) || 0;

    const cn = classnames({
      [this.getCss().group]: selected
    });

    const titleCn = classnames({
      [this.getCss().grouptitle]: selected,
      [this.getCss().title]: !selected
    });

    return (
      <div className={cn} key={id}>
        <div className={titleCn} onClick={() => onSelect(id)} >
          {title}
        </div>
        <div className={this.getCss().groupitems} style={{height}} >
          <div className={this.getCss().groupmask} style={{top}}/>
          {children.map(item => {
            return this._renderSelection({item, selectedId, onSelect});
          })}
        </div>
      </div>
    );
  }

  _renderSelection({item, selectedId, onSelect}) {

    const {title, id} = item;

    const cn = classnames({
      [this.getCss().title]: true,
      [this.getCss().selected]: id === selectedId
    });

    return (
      <div className={cn} key={id} onClick={() => onSelect(id)} >
        {title}
      </div>
    );
  }

  static propTypes = {
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedId: PropTypes.any,
    selectedColor: PropTypes.string
  }

  static displayName = 'SideBar.Menu'

}

export default Menu;
