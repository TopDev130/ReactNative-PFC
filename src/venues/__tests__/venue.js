/* eslint no-undef:0 */

import immutable from 'immutable';

jest.dontMock('../venue');

const plainVenue = {
  address: {
    loc: [1, 2]
  },
  hours: {
    start: '1200'
  },
  title: 'Test venue'
};

const immutableVenue = immutable.fromJS(plainVenue);

describe('venue#venue', () => {

  const Venue = require('../venue').default;

  describe('constructor()', () => {

    it('should accept Map', () => {
      const venue = new Venue(immutableVenue);
      expect(venue.title).toBe(plainVenue.title);
      expect(venue.address.loc.toJS()).toEqual(plainVenue.address.loc);
      expect(venue.hours.start).toEqual(plainVenue.hours.start);
    });

    it('should accept plain object', () => {
      const venue = new Venue(plainVenue);
      expect(venue.title).toBe(plainVenue.title);
      expect(venue.address.loc.toJS()).toEqual(plainVenue.address.loc);
      expect(venue.hours.start).toEqual(plainVenue.hours.start);
    });

  });

  describe('address()', () => {

    it('should have lat and lng getters', () => {
      const venue = new Venue(immutableVenue);
      expect(venue.address.lng).toBe(plainVenue.address.loc[0]);
      expect(venue.address.lat).toBe(plainVenue.address.loc[1]);
    });

  });

});
