import axios from 'axios';
export const ANSWER = 'answer';
export const NEXT = 'next';
export const BACK ='back';
export const ONLOAD = 'onload';

export function answer(btnId) {
  return {
    type: ANSWER,
    btnId: btnId,
  }
}

export function next(qnum) {

  return {
    'type': NEXT,
  }
}

export function back() {

  return {
    'type': BACK,
  }
}

export function onload() {
  const url = '/questions';
  const request = axios.get(url);

  return {
    'type': ONLOAD,
    'payload': request
  }
}
