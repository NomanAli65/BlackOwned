import { ActionTypes } from '../action_types';

let initialState = {
    getUserJobsData: null,
    getUserJobsData_list: [],
   
    postJobData: [],
    
    loading: false,

};

export const JobsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.Get_UserJobs:
            let getUserJobsData_list_copy = [];
            getUserJobsData_list_copy = [
                ...state.getUserJobsData_list,
                ...action.payload.data,
            ];
            state = {
                ...state,
                getUserJobsData: action.payload,
                getUserJobsData_list: getUserJobsData_list_copy,
            };
            break;
        case ActionTypes.Reset_Get_UserJobs:
            state = {
                ...state,
                getUserJobsData: null,
                getUserJobsData_list: [],
            };
            break;
        
        case ActionTypes.Post_Job:
            state = { ...state, postJobData: action.payload };
            break;

        

        default:
            break;
    }
    return state;
};
