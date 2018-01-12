import { combineReducers } from 'redux';
import DecksReducer from './decks-reducer';

export default combineReducers({
  decks: DecksReducer,
});