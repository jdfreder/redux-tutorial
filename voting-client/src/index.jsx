import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['a', 'b'];

ReactDOM.render(
    <Voting pair={pair} hasVoted='a'/>,
    document.getElementById('app')
);
