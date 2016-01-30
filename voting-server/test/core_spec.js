import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', ()=>{
    describe('setEntries', ()=>{
        it('add the entries to the state', ()=>{
            const state = Map();
            const entries = new List('a', 'b');
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({entries: entries}));
        });
        
        it('converts to immutable', ()=>{
            const state = Map();
            const entries = ['a', 'b'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({entries: fromJS(entries)}));
        });
    });
    
    describe('next', ()=>{
        it('takes the next two entries under vote', ()=>{
            const state = fromJS({
                entries: ['a', 'b', 'c']
            });
            const nextState = next(state);
            
            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ['a', 'b']
                },
                entries: ['c']
            }));
        });
        it('puts winner of current vote back into entries', ()=>{
            const state = fromJS({
                vote: {
                    pair: ['d', 'e'],
                    tally: {
                        d: 2,
                        e: 4
                    }
                },
                entries: ['a', 'b', 'c']
            });
            const nextState = next(state);
            
            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ['a', 'b']
                },
                entries: ['c', 'e']
            }));
        });
    });
    
    describe('vote', ()=>{
        it('creates a tally for the voted entry', ()=>{
            const state = fromJS({
                vote: {
                    pair: ['a', 'b']
                },
                entries: []
            });
            const nextState = vote(state, 'a');
            
            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ['a', 'b'],
                    tally: {
                        'a': 1
                    }
                },
                entries: []
            }));
        });
        it('adds a tally for the voted entry', ()=>{
            const state = fromJS({
                vote: {
                    pair: ['a', 'b'],
                    tally: {
                        'a': 2,
                        'b': 3
                    }
                },
                entries: []
            });
            const nextState = vote(state, 'b');
            
            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ['a', 'b'],
                    tally: {
                        'a': 2,
                        'b': 4
                    }
                },
                entries: []
            }));
        });
    });
});