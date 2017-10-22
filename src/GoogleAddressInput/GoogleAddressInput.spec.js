import 'react';
import {componentFactory} from './GoogleAddressInput.driver';
import _ from 'lodash/fp';
import sinon from 'sinon';
import waitFor from 'wait-for-cond';

const GEOCODE_RESULT = JSON.parse('{"formatted_address":"_formatted_address_","address_components":[{"types":["street_number"],"long_name":123}]}');
GEOCODE_RESULT.geometry = {
  location: {
    lat: () => 31.12,
    lng: () => 33.34
  }
};

export class GmapsTestClient {
  autocomplete({request}) {

    if (request.input === 'dontfind') {
      return Promise.resolve([]);
    }

    return Promise.resolve([
      {description: JSON.stringify(request) + ' - 1'},
      {description: JSON.stringify(request) + ' - 2'}
    ]);
  }

  geocode({request}) {
    const {address, placeId} = request;
    if (address || placeId) {
      return Promise.resolve(
        [_.extend({}, GEOCODE_RESULT, {__called__: JSON.stringify(request)})]
      );
    }
    throw new Error('geocode() request params are malformed');
  }
}

describe('GoogleAddressInput', () => {
  const {createShallow, createMount} = componentFactory();

  describe('appearance', () => {
    it('should show magnifying glass by default', () => {
      const component = createShallow({Client: GmapsTestClient});
      expect(component.find('InputWithOptions').props().magnifyingGlass).toEqual(true);
    });

    it('should allow hiding magnifying glass', () => {
      const component = createShallow({Client: GmapsTestClient, magnifyingGlass: false});
      expect(component.find('InputWithOptions').props().magnifyingGlass).toEqual(false);
    });

    it('should allow setting theme for the nested input', () => {
      const component = createShallow({Client: GmapsTestClient, theme: 'material'});
      expect(component.find('InputWithOptions').props().theme).toEqual('material');
    });

    it('should allow the input to be readOnly', () => {
      const component = createShallow({Client: GmapsTestClient, readOnly: true});
      expect(component.find('InputWithOptions').props().readOnly).toEqual(true);
    });

    it('should show a footer', () => {
      const component = createShallow({Client: GmapsTestClient, readOnly: true, footer: 'foo bar', footerOptions: {overrideStyle: true, disabled: true}});

      expect(component.find('InputWithOptions').props().options).toEqual([{
        id: 0,
        value: 'foo bar',
        overrideStyle: true,
        disabled: true
      }]);
    });

    it('should show the powered by google footer', () => {
      const component = createMount({Client: GmapsTestClient, poweredByGoogle: true});
      expect(component.find('[data-hook="google-footer"]').exists()).toEqual(true);
    });

    it('should not show the powered by google footer', () => {
      const component = createShallow({Client: GmapsTestClient});
      expect(component.find('[data-hook="google-footer"]').exists()).toEqual(false);
    });
  });

  describe('User Interactions', () => {

    it('should specify autoSelect as default option', () => {
      const component = createMount({Client: GmapsTestClient, countryCode: 'XX'});
      expect(component.find('InputWithOptions').props().autoSelect).toEqual(true);
    });

    it('should allow to override autoSelect option', () => {
      const component = createMount({Client: GmapsTestClient, countryCode: 'XX', autoSelect: false});
      expect(component.find('InputWithOptions').props().autoSelect).toEqual(false);
    });

    it('should allow focusing input', () => {
      const component = createMount({Client: GmapsTestClient, countryCode: 'XX'});
      const input = component.find('input').get(0);
      sinon.spy(input, 'focus');
      component.instance().focus();
      expect(input.focus.calledOnce).toEqual(true);
    });

    it('should allow selecting input', () => {
      const component = createMount({Client: GmapsTestClient, countryCode: 'XX'});
      const input = component.find('input').get(0);
      sinon.spy(input, 'select');
      component.instance().select();
      expect(input.select.calledOnce).toEqual(true);
    });

    it('If user changes the value in the autocomplete box, request suggestions from google.maps', done => {

      const component = createShallow({Client: GmapsTestClient, countryCode: 'XX'});
      const event = {target: {value: 'Hatomer 49'}};
      component.find('InputWithOptions').props().onInput(event);

      // Defer to make sure all promises run
      _.defer(() => {
        try {
          component.update();
          expect(component.find('InputWithOptions').props().options).toEqual([
            {id: 0, value: '{"components":"country:XX","input":"Hatomer 49"} - 1'},
            {id: 1, value: '{"components":"country:XX","input":"Hatomer 49"} - 2'}
          ]);
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });

    it('If user pressed <enter> with a suggested value, geocode the suggested value, and call the onSet callback', done => {

      const onSet = sinon.spy();

      const component = createShallow({Client: GmapsTestClient, countryCode: 'XX', onSet});
      component.setState({suggestions: [JSON.parse('{"description": "my address", "place_id": 123}')]});
      component.find('InputWithOptions').props().onSelect({id: 0, value: 'my address'});

      // Defer to make sure all promises run
      _.defer(() => {
        try {
          expect(onSet.args[0][0]).toEqual({
            originValue: 'my address',
            googleResult: GEOCODE_RESULT,
            address: {
              approximate: true,
              latLng: {
                lat: 31.12,
                lng: 33.34
              },
              number: 123,
              formatted: '_formatted_address_'
            }
          });
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });

    it('If user pressed <enter> with a value that is not on the suggestions list, try to suggest it and geocode if successful', done => {
      const onSet = sinon.spy();

      const component = createShallow({Client: GmapsTestClient, countryCode: 'XX', onSet});
      component.setState({suggestions: [JSON.parse('{"description": "my address", "place_id": 123}')]});
      component.find('InputWithOptions').props().onManuallyInput('my addr');

      // Defer to make sure all promises run
      _.defer(() => {
        try {
          expect(onSet.args[0][0]).toEqual({
            originValue: '{"components":"country:XX","input":"my addr"} - 1', // The first suggestion
            googleResult: GEOCODE_RESULT,
            address: {
              approximate: true,
              latLng: {
                lat: 31.12,
                lng: 33.34
              },
              number: 123,
              formatted: '_formatted_address_'
            }
          });
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });

    it('If user pressed <enter> with a value that is not on the suggestions list, try to suggest it and return null if unsuccessful', done => {
      const onSet = sinon.spy();
      const component = createShallow({Client: GmapsTestClient, countryCode: 'YY', onSet});
      component.setState({suggestions: [JSON.parse('{"description": "my address", "place_id": 123}')]});
      component.find('InputWithOptions').props().onManuallyInput('dontfind');

      // Defer to make sure all promises run
      _.defer(() => {
        try {
          expect(onSet.args[0][0]).toEqual(null);
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });

    it('clear suggestions on blur', () => {
      const component = createShallow({Client: GmapsTestClient, countryCode: 'XX'});
      component.setState({suggestions: [JSON.parse('{"description": "my address", "place_id": 123}')]});
      component.find('InputWithOptions').props().onBlur();
      return waitFor(() => component.find('InputWithOptions').props().options.length === 0);
    });

    it('don\'t clear suggestions if clearSuggestionsOnBlur === false', done => {
      const component = createShallow({Client: GmapsTestClient, countryCode: 'XX', clearSuggestionsOnBlur: false});
      component.setState({suggestions: [JSON.parse('{"description": "my address", "place_id": 123}')]});
      component.find('InputWithOptions').props().onBlur();
      setTimeout(() => {
        expect(component.find('InputWithOptions').props().options.length).toEqual(1);
        done();
      }, 300);
    });
  });
});
