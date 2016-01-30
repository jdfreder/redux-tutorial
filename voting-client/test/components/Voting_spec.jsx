import React from 'react/addons';
import {Voting} from '../../src/components/Voting';
import {expect} from 'chai';
import {List} from 'immutable';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = React.addons.TestUtils;

describe('Voting', () => {
    
      it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
          <Voting pair={["a", "b"]} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        
        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('a');
        expect(buttons[1].textContent).to.equal('b');
      });
          
    it('invokes vote when clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;
        
        const component = renderIntoDocument(
            <Voting pair={["a", "b"]} vote={vote}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);

        expect(votedWith).to.equal('a');
    });
    it('disables buttons when user has voted', () => {
      const component = renderIntoDocument(
        <Voting pair={["a", "b"]}
                hasVoted="a" />
      );
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

      expect(buttons.length).to.equal(2);
      expect(buttons[0].hasAttribute('disabled')).to.equal(true);
      expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });
    it('adds label to the voted entry', () => {
      const component = renderIntoDocument(
        <Voting pair={["a", "b"]}
                hasVoted="a" />
      );
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

      expect(buttons[0].textContent).to.contain('Voted');
    });
    it('renders just the winner when there is one', () => {
      const component = renderIntoDocument(
        <Voting winner="a" />
      );
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
      expect(buttons.length).to.equal(0);

      const winner = React.findDOMNode(component.refs.winner);
      let ok = expect(winner).to.be.ok;
      expect(winner.textContent).to.contain('a');
    });
    it('renders as a pure component', () => {
      const pair = ['a', 'b'];
      const component = renderIntoDocument(
        <Voting pair={pair} />
      );

      let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
      expect(firstButton.textContent).to.equal('a');

      pair[0] = 'c';
      component.setProps({pair: pair});
      firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
      expect(firstButton.textContent).to.equal('a');
    });
    it('does update DOM when prop changes', () => {
      const pair = List(['a', 'b']);
      const component = renderIntoDocument(
        <Voting pair={pair} />
      );

      let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
      expect(firstButton.textContent).to.equal('a');

      const newPair = pair.set(0, 'c');
      component.setProps({pair: newPair});
      firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
      expect(firstButton.textContent).to.equal('c');
    });
});