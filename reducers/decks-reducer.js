import { ADD_DECK, ADD_QUESTION } from '../actions/types';
import { REHYDRATE } from 'redux-persist/constants'

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_DECK:
      return { ...state, [action.payload.title]: action.payload }

    case ADD_QUESTION:
      const newQuestion = {
        question: action.payload.question,
        answer: action.payload.answer
      }
      return {
        ...state,
        [action.payload.title]: {
          ...state[action.payload.title],
          questions: state[action.payload.title].questions.concat(newQuestion)
        }
      }

    case REHYDRATE:
      let incoming = action.payload.myReducer
      if (incoming) return { ...state, ...incoming, specialKey: processSpecial(incoming.specialKey) }
      return state

    default:
      return state;
  }
};