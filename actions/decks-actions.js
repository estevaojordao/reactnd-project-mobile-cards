import { ADD_DECK, ADD_QUESTION } from './types';

export const addDeck = (title) => {
  return {
    type: ADD_DECK,
    payload: {
      title,
      questions: []
    }
  }
}

export const addQuestion = (title, question, answer) => {
  return {
    type: ADD_QUESTION,
    payload: {
      title,
      question,
      answer
    }
  }
}