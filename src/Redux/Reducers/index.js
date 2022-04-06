import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import trivia from './trivia';

const rootReducer = combineReducers({ player, token, trivia });

export default rootReducer;
