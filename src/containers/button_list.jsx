import React, { Component } from 'react';
import AnswerButton from '../components/answer_button';

export default class buttonList extends Component {
  render() {
    return (
      <div>
        <AnswerButton id={0} />
        <AnswerButton id={1} />
        <AnswerButton id={2} />
      </div>

    );
  }
}
