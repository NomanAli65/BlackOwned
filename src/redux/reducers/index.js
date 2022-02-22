import {combineReducers} from 'redux';
import {AuthReducer} from './AuthReducer';
import {GeneralReducer} from './General';
import {ServicesReducer} from './ServicesReducer';
import {BanksReducer} from './BanksReducer';


export const reducer = combineReducers({AuthReducer, GeneralReducer, ServicesReducer, BanksReducer});
