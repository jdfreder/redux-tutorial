import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', ()=>{
    describe('a number', ()=>{
        function increment(state) {
            return state + 1;
        }
        
        it('is immutable', ()=>{
            let state = 42;
            let nextState = increment(state);
            
            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });
    
    describe('a list', ()=>{
        function addMovie(state, movie) {
            return state.push(movie);
        }
        
        it('is immutable', ()=>{
            let state = List.of('a', 'b');
            let nextState = addMovie(state, 'c');
            
            expect(state).to.equal(List.of('a', 'b'));
            expect(nextState).to.equal(List.of('a', 'b', 'c'));
        });
    });
    
    describe('a tree', ()=>{
        function addMovie(state, movie) {
            // return state.set('movies', state.get('movies').push(movie));
            return state.update('movies', movies => movies.push(movie));
        }
        
        it('is immutable', ()=>{
            let state = Map({'movies': List.of('a', 'b')});
            let nextState = addMovie(state, 'c');
            
            expect(state).to.equal(Map({movies: List.of('a', 'b')}));
            expect(nextState).to.equal(Map({movies: List.of('a', 'b', 'c')}));
        });
    });
});