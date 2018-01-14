
import { ANSWER, NEXT, BACK, ONLOAD } from '../actions/index'

const initState = {
  qnum: 1,
  btnColor: Array(5).fill('#eaecef'),
  questions: [{
    code: '',
    question: '',
    answer: ''
  }],
  answer: 0

};

const answerList = {
  'a': 0,
  'b': 1,
  'c': 2
};

export default function (state = initState, action) {

  switch (action.type) {
    case ANSWER: {
      const { btnId } = action;
      const { answer, btnColor } = state;

      const newBtnColor = btnColor.slice();

      if (answer === btnId) {
        newBtnColor[btnId] = "#98FF98";
      } else {
        newBtnColor[btnId] = "#FBBBB9";
      }

      return Object.assign({}, state, {btnColor: newBtnColor});
    }

    case NEXT: {
      const total = state.questions.length;
      const qnum = state.qnum % (total) + 1
      const answer = answerList[state.questions[qnum - 1].answer];

      return Object.assign({}, state, {
        qnum: qnum,
        btnColor: initState["btnColor"],
        answer: answer
      });
    }

    case BACK: {

      const total = state.questions.length;
      const qnum = state.qnum - 1 + 23 * (1 - Math.ceil((state.qnum - 1) / total));
      const answer = answerList[state.questions[qnum - 1].answer];

      return Object.assign({}, state, {
        qnum: qnum,
        btnColor: initState["btnColor"],
        answer: answer
      });
    }

    case ONLOAD: {
      const questions = action.payload.data;

      return Object.assign({}, state, {
        questions: questions
      });
    }

    default:
      return state;
  }
}
