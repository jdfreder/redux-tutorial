import {Map, fromJS} from 'immutable';
export function setEntries(state, entries) {
    return state.set('entries', fromJS(entries));
}

export function next(state) {
    let nextState = state.set('vote', Map({pair: state.get('entries').slice(0,2)}));
    return nextState.update('entries', entries => entries.slice(2));
}