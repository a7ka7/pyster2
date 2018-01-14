import React, { Component } from 'react';
import PageButton from '../components/page_button';
import AnswerButton from '../components/answer_button';
import Code from '../components/code';
import Selection from '../components/selection';
import TitleBar from '../components/title_bar';
import { onload } from '../actions/index';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount() {

    this.props.onload();

  }

  render() {
    return (
      <div>
        <div className='titleBar'>
          <TitleBar />
        </div>
        <div className='code'>
          <Code />
        </div>
        <div className='selection'>
          <Selection />
        </div>
        <div className='answer'>
          {[0, 1, 2].map(i => {return <AnswerButton id={i} />})}
        </div>
        <div className='pagination'>
          {['type', 'next'].map(x => {return <PageButton type={x} />})}
        </div>
      </div>
    );
  }
}

export default connect(null, { onload })(App);
