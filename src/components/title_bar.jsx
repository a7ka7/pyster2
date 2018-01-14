import React, { Component } from 'react';
import { connect } from 'react-redux';

class TitleBar extends Component {
  render() {
    const { qnum, questions } = this.props;
    return (
      <h1>- Question { qnum } / { questions.length } -</h1>
    );
  }
}

function mapStateToProps(state) {
	return {
    qnum: state.qnum,
    questions: state.questions
	};
}

export default connect(mapStateToProps)(TitleBar);
