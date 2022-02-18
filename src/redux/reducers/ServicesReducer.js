import { ActionTypes } from '../action_types';

let initialState = {
    getServicesData: null,
    getServicesData_list: [],
    loading: false,
};

export const ServicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.Customer_Services:
            let getServicesData_list_copy = [];
            getServicesData_list_copy = [
                ...state.getServicesData_list,
                ...action.payload.data,
            ];
            state = {
                ...state,
                getServicesData: action.payload,
                getServicesData_list: getServicesData_list_copy,
            };
            break;
        case ActionTypes.Reset_Customer_Services:
            state = {
                ...state,
                getServicesData: null,
                getServicesData_list: [],
            };
            break;

        default:
            break;
    }
    return state;
};
