import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Loader from '../../src/Loader/Loader';
import ModalSelector from '../../src/ModalSelector';
import Selector from '../../src/Selector';
import {Button} from 'wix-style-react/Backoffice';

const imageSrc = 'http://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY=';
const places = [
  'Lake Briashire',
  'Tristinchester',
  'South Phoebe',
  'South Adaborough',
  'Caspian Sea',
  'Great Lakes',
  'Tanganyika Lake',
  'Baikal',
  'Winnipeg',
  'Titicaca',
  'Borneo',
  'Honshu',
  'Sulawesi',
  'Luzon',
  'Sri Lanka',
  'Spitsbergen'
];

const generateAllOptions = () => places.map((title, i) =>
  ({
    id: i,
    title,
    subtitle: (new Date(Date.now() + Math.round(Math.random() * 365 * 24 * 60 * 60 * 1000))).toLocaleDateString('en', {day: 'numeric', month: 'short', year: 'numeric'}),
    extraText: Math.round(Math.random() * 100) + '% Off',
    imageSrc
  })
);

class OptionsBackend {
  allOptions = generateAllOptions();

  fetch() {
    return new Promise(res => setTimeout(
      () => res({
        options: this.allOptions.splice(0, 4),
        hasMore: this.allOptions.length > 0
      }),
      3000
    ));
  }
}

class ControlledModalSelector extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool
  };

  constructor({isOpen = false}) {
    super();
    this.state = {
      isOpen,
      options: [],
      hasMore: true,
      searchText: ''
    };
    this.prevState = {};
    this.optionsBackend = new OptionsBackend();
  }

  generateSetState = state => () => this.setState(state);

  close = this.generateSetState({isOpen: false});
  open = this.generateSetState({isOpen: true});

  toggleSelector = id => {
    this.setState(({options: prevOptions}) => {
      const options = prevOptions.map(option =>
        option.id === id ?
        {...option, selected: !option.selected} :
        option
      );

      return {options};
    });
  }

  toggleFooterStatus = () => {
    this.setState(({options: prevOptions}) => {
      const someSelected = prevOptions.some(x => x.selected);
      const options = prevOptions.map(option =>
        someSelected && !option.selected ?
        option :
        {...option, selected: !someSelected}
      );

      return {options};
    });
  };

  search = searchText => {
    this.setState({searchText});
  };

  loadMore = () => {
    this.optionsBackend.fetch().then(({options, hasMore}) =>
      this.setState(({options: prevOptions}) => ({
        options: [
          ...prevOptions,
          ...options.map(option => ({...option, selected: false}))
        ],
        hasMore
      }))
    );
  };

  componentWillUpdate() {
    this.prevState = this.state;
  }

  calcFooterState() {
    if (this.state.options === this.prevState.options) {
      return this.prevFooterState;
    }

    const numOfSelected = this.state.options.filter(x => x.selected).length;
    const footerState = {
      footerText: numOfSelected ?
        `Deselect (${numOfSelected})` :
        `Select All (${this.state.options.length})`,
      footerChecked: !!numOfSelected
    };

    this.prevFooterState = footerState;
    return footerState;
  }

  calcFilteredOptions() {
    if (this.state.options === this.prevState.options &&
      this.state.searchText === this.prevState.searchText
    ) {
      return this.prevFilteredOptions;
    }

    const searchTextLowerCase = this.state.searchText.toLowerCase();
    const filteredOptions = searchTextLowerCase ? this.state.options.filter(({title}) => title.toLowerCase().includes(searchTextLowerCase)) : this.state.options;

    this.prevFilteredOptions = filteredOptions;
    return filteredOptions;
  }

  render() {
    const {footerText, footerChecked} = this.calcFooterState();
    const filteredOptions = this.calcFilteredOptions();

    const searchInput = (<ModalSelector.Search
      onChange={this.search}
      minimumChars={1}
      delayTime={300}
      />);

    const footerStatus = (<ModalSelector.FooterStatus
      checked={footerChecked}
      text={footerText}
      onCheckBoxClick={this.toggleFooterStatus}
      />);

    return (
      <div>
        <Button onClick={this.open}>Open Modal Selector</Button>
        <ModalSelector
          isOpen={this.state.isOpen}
          onOk={this.close}
          onCancel={this.close}
          onClose={this.close}
          enableOk={footerChecked}
          prefixContent={searchInput}
          footerStatus={footerStatus}
          hasMore={this.state.hasMore}
          loadMore={this.loadMore}
          initialLoad
          >
          {
            this.state.options.length === 0 ?
              <Loader/> :
              filteredOptions.map(x =>
                <Selector
                  id={x.id}
                  key={x.id}
                  title={x.title}
                  subTitle={x.subtitle}
                  imageSrc={x.imageSrc}
                  imageSize="Large Square"
                  onToggle={this.toggleSelector}
                  isSelected={x.selected}
                  >
                  <Selector.ExtraText text={x.extraText}/>
                  {/* <Selector.ExtraIcon name="Add"/> */}
                  {/*<Selector.ProgressBar progress={83}/>*/}
                </Selector>
              )}
        </ModalSelector>
      </div>
    );
  }
}

export default () =>
  <div>
    <ControlledModalSelector/>
  </div>;
