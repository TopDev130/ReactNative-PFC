/* eslint no-undef:0 */

import immutable, {List} from 'immutable';

jest.dontMock('../store');
jest.dontMock('../state');

const listInitialState = immutable.fromJS({
  list: []
});

const reviveInitialState = immutable.fromJS({
  activeVenue: 1,
  currentVenue: 2
});

describe('venue#store', () => {

  const store = require('../store').default;

  describe('store()', () => {

    it('should have initial state', () => {
      const state = store();
      expect(state.list).toBe(null);
      expect(state.get('currentVenue')).toBe(-1);
      expect(state.get('activeVenue')).toBe(-1);
    });

    describe('revive', () => {

      it('should work with list only', () => {
        const state = store(listInitialState);
        expect(List.isList(state.list)).toBe(true);
        expect(state.get('activeVenue')).toBe(-1);
        expect(state.get('currentVenue')).toBe(-1);
      });

      it('should update activeVenue and currentVenue', () => {
        const state = store(reviveInitialState);
        expect(state.get('activeVenue')).toBe(reviveInitialState.get('activeVenue'));
        expect(state.get('currentVenue')).toBe(reviveInitialState.get('currentVenue'));
      });

    });

  });

});
