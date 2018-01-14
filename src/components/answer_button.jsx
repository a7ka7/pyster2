import React, { Component } from 'react';
import { answer } from '../actions/index';
import { connect } from 'react-redux';

class AnswerButton extends Component {
  
  clickHandler(event) {
    this.props.answer(this.props.id);
  }

  render() {
    const color = this.props.btnColor[this.props.id]
    const letters = ['a', 'b', 'c'];
    return (
      <button
        style={{backgroundColor: color}}
        onClick={this.clickHandler.bind(this)}>{letters[this.props.id]}
      </button>
    );
  }
}

function mapStateToProps(state) {
	return {
		btnColor: state.btnColor
	};
}

export default connect(mapStateToProps, { answer })(AnswerButton);
