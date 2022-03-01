import { ActionTypes } from '../action_types';

let initialState = {
    getUserListData: null,
    getUserListData_list: [],
    friendRequestData: [],
    loading: false,

};

export const NetworkReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.Get_UserList:
            let getUserListData_list_copy = [];
            getUserListData_list_copy = [
                ...state.getUserListData_list,
                ...action.payload.data,
            ];
            state = {
                ...state,
                getUserListData: action.payload,
                getUserListData_list: getUserListData_list_copy,
            };
            break;
        case ActionTypes.Reset_Get_UserList:
            state = {
                ...state,
                getUserListData: null,
                getUserListData_list: [],
            };
            break;

        case ActionTypes.Friend_Request:
            state = { ...state, friendRequestData: action.payload };
            break;

        default:
            break;
    }
    return state;
};
