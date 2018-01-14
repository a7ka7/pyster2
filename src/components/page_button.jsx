import React, {Component} from 'react';
import { next, back } from '../actions/index';
import { connect } from 'react-redux';

class PageButton extends Component {
  constructor(props) {
    super(props);
    this.state = { type: props.type };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(event) {
    if (this.state.type === 'next') {
      this.props.next(this.props.qnum);
    } else {
      this.props.back();
    }
  }

  render() {
    if (this.state.type === 'next') {
      return (
        <button onClick={ this.clickHandler }>
            Next&nbsp;
            <span className="glyphicon glyphicon-forward"></span>
        </button>
      );
    } else {
      return (
        <button onClick={ this.clickHandler }>
          <span className="glyphicon glyphicon-backward"></span>
          &nbsp;Back
        </button>
      );
    }
  }
}

function mapStateToProps(state) {
	return {
    qnum: state.qnum
	};
}


export default connect(mapStateToProps, { next, back })(PageButton);
