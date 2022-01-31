import {combineReducers} from 'redux';
import {AuthReducer} from './AuthReducer';
import {GeneralReducer} from './General';

export const reducer = combineReducers({AuthReducer, GeneralReducer});
