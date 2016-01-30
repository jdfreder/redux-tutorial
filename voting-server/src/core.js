import {Map, fromJS} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
    return state.set('entries', fromJS(entries));
}

function getWinners(state) {
    const voteState = state.get('vote');
    if (!voteState) return [];
    
    const [a, b] = voteState.get('pair');
    const aVotes = voteState.getIn(['tally', a], 0);
    const bVotes = voteState.getIn(['tally', b], 0);
    if (aVotes>bVotes) {
        return [a];
    } else if (aVotes<bVotes) {
        return [b];
    } else {
        return [a, b];
    }
}

export function next(state) {
    // let nextState = state.set('vote', Map({pair: state.get('entries').slice(0,2)}));
    // return nextState.update('entries', entries => entries.slice(2));
    const entries = state.get('entries').concat(getWinners(state));
    if (entries.count() === 1) {
        return state.remove('vote').remove('entries').set('winner', entries.first());
    } else {
        return state.merge(fromJS({
            vote: {pair: entries.take(2)},
            entries: entries.skip(2)
        }));
    }
}

export function vote(state, value) {
    // return state.mergeDeep(fromJS({
    //     vote: {tally: (Map()).set(value, state.get('vote').get('tally', Map()).get(value, 0) + 1)},
    // }));
    return state.updateIn(['vote', 'tally', value], 0, tally => tally + 1);
}