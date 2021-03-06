import React, { Component } from 'react';
import { connect } from 'react-redux';

class Selection extends Component {

  render() {
    // const { qnum, questions } = this.props;
    const { question } = this.props;

    if (question) {
      return (
        <p dangerouslySetInnerHTML={{__html: question}} />
      );
    } else {
      return (
        <p>Loading...</p>
      );
    }
  }
}

function mapStateToProps(state) {
	return {
    question: state.questions[state.qnum - 1].question
	};
}

export default connect(mapStateToProps)(Selection);
