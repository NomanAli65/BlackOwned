import { combineReducers } from 'redux';
import { AuthReducer } from './AuthReducer';
import { BanksReducer } from './BanksReducer';
import { GeneralReducer } from './General';
import { JobsReducer } from './JobsReducer';
import { ListedCompaniesReducer } from './ListedCompaniesReducer';
import { MarketPlaceReducer } from './MarketPlaceReducer';
import { NewsReducer } from './NewsReducer';
import { PostReducer } from './PostReducer';
import { SeminarsReducer } from './SeminarsReducer';
import { ServicesReducer } from './ServicesReducer';





export const reducer = combineReducers({ AuthReducer, GeneralReducer, ServicesReducer, BanksReducer, NewsReducer, SeminarsReducer, ListedCompaniesReducer, MarketPlaceReducer, PostReducer });
export const reducer = combineReducers({ AuthReducer, GeneralReducer, ServicesReducer, BanksReducer, NewsReducer, SeminarsReducer, ListedCompaniesReducer, MarketPlaceReducer, JobsReducer });
