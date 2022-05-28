import { combineReducers } from 'redux';
import player from './player';
import settings from './settings';
import token from './token';
import trivia from './trivia';

const rootReducer = combineReducers({ player, token, trivia, settings });

export default rootReducer;
