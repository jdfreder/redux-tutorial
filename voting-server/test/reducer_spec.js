import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';
import {vote, setEntries, next} from '../src/core';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const state = Map();
    const action = {type: 'SET_ENTRIES', entries: ['a']};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(setEntries(state, action.entries));
  });

  it('handles NEXT', () => {
    const state = fromJS({
      entries: ['a', 'b']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(next(state));
  });

  it('handles VOTE', () => {
    const state = fromJS({
      vote: {
        pair: ['a', 'b']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'a'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(vote(state, action.entry));
  });
  it('has an initial state', () => {
     const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
     const nextState = reducer(undefined, action);
     expect(nextState).to.equal(fromJS({
       entries: ['Trainspotting']
     }));
   });
   it('can be used with reduce', () => {
     const actions = [
       {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
       {type: 'NEXT'},
       {type: 'VOTE', entry: 'Trainspotting'},
       {type: 'VOTE', entry: '28 Days Later'},
       {type: 'VOTE', entry: 'Trainspotting'},
       {type: 'NEXT'}
     ];
     const finalState = actions.reduce(reducer, Map());

     expect(finalState).to.equal(fromJS({
       winner: 'Trainspotting'
     }));
   });
});