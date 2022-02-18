import { TabActions } from '@react-navigation/native';
import { ActionTypes } from '../action_types';

const initialState = {
  user: null,
  is_logged_in: false,
};

export const AuthReducer = (state = initialState, action) => {

  // console.warn("Auth Reducer ==");
  switch (action.type) {
    case ActionTypes.Register:
      state = { user: action.payload, is_logged_in: true };
      break;
    case ActionTypes.Login:
      state = { user: action.payload, is_logged_in: true };
      break;
    case ActionTypes.Logout:
      state = { user: null, is_logged_in: false };
      break;
    default:
      break;
  }
  return state;
};
