import React, { Component } from 'react';
import { connect } from 'react-redux';

class Code extends Component {

  render() {
    const { code } = this.props;
    return (
      <p dangerouslySetInnerHTML={{__html: code}} />
    );
  }
}

function mapStateToProps(state) {
  return {
    code: state.questions[state.qnum - 1].code
	};
}

export default connect(mapStateToProps)(Code);
