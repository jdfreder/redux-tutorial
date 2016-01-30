import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setEntries, next} from '../src/core';

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
    });
});