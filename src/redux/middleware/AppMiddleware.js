import { APIs } from '../../configs/APIs';
import { post, get, POST } from '../../configs/AxiosConfig';
import { ActionTypes } from '../action_types';
import { getHeaders } from '../../Utils';
import Storage from '../../Utils/AsyncStorage';
import { Alert } from 'react-native';


export const AppMiddleware = {
    // Register: userData => {
    //     return async dispatch => {
    //         dispatch({ type: ActionTypes.ShowLoading });
    //         try {
    //             let formData = new FormData();
    //             formData.append('username', userData.username);
    //             formData.append('email', userData.email);
    //             formData.append('password', userData.password);
    //             formData.append('confirm_password', userData.c_password);
    //             formData.append('city', userData.city);
    //             formData.append('role', userData.userType);
    //             formData.append('phone', userData.phone);
    //             if (userData.provider)
    //                 formData.append('provider_as', userData.provider);
    //             if (userData.company_name)
    //                 formData.append('company_name', userData.company_name);
    //             let request = await post(APIs.REGISTER, formData);
    //             if (request) {
    //                 dispatch({ type: ActionTypes.Register, payload: request });
    //             }
    //             dispatch({ type: ActionTypes.HideLoading });
    //         } catch (error) { }
    //     };
    // },
    // Login: userData => {
    //     return async dispatch => {
    //         try {
    //             dispatch({ type: ActionTypes.ShowLoading });
    //             let formData = new FormData();
    //             formData.append('email', userData.email);
    //             formData.append('password', userData.password);
    //             let request = await post(APIs.LOGIN, formData);
    //             console.warn("Login Data:", request);
    //             if (request) {
    //                 dispatch({ type: ActionTypes.Register, payload: request });
    //             }
    //             dispatch({ type: ActionTypes.HideLoading });
    //         } catch (error) { }
    //     };
    // },
    UpdateProfileProvider: userData => {
        return async dispatch => {
            try {
                dispatch({ type: ActionTypes.ShowLoading });
                let formData = new FormData();
                console.warn('userData Middleware', userData?.userData);
                formData.append('username', userData?.userData?.username);
                formData.append('phone', userData?.userData?.phone);
                formData.append('address', userData?.userData?.address);
                formData.append('gender', userData?.userData?.gender);
                formData.append('provider_as', userData?.userData?.provider_as);
                formData.append('company_name', userData?.userData?.company_name);
                formData.append('company_address', userData?.userData?.company_address);
                formData.append('company_lat', userData?.userData?.lat);
                formData.append('company_lng', userData?.userData?.lng);
                // formData.append('country', userData.country);
                formData.append('city', userData?.userData?.city);
                formData.append('state', userData?.userData?.state);
                formData.append('zip', userData?.userData?.zip);
                formData.append('profile_pic', userData?.userData?.profile_pic)
                console.warn('formDataa', formData);
                let request = await post(APIs.UPDATEPROFILE,
                    formData,
                    await getHeaders(),

                );
                console.warn("userData Data:", request);
                if (request) {
                    dispatch({ type: ActionTypes.Update_Profile, payload: request });

                }
                dispatch({ type: ActionTypes.HideLoading });
            } catch (error) { }
        };
    },
    UpdateProfileCustomer: userData => {
        return async dispatch => {
            try {
                dispatch({ type: ActionTypes.ShowLoading });
                let formData = new FormData();
                console.warn('userData Middleware', userData?.userData);
                formData.append('username', userData?.userData?.username);
                formData.append('phone', userData?.userData?.phone);
                formData.append('address', userData?.userData?.address);
                formData.append('gender', userData?.userData?.gender);
                // formData.append('country', userData.country);
                formData.append('city', userData?.userData?.city);
                formData.append('state', userData?.userData?.state);
                formData.append('zip', userData?.userData?.zip);
                formData.append('profile_pic', userData?.userData?.profile_pic)
                console.warn('formDataa', formData);
                let request = await post(APIs.UPDATEPROFILE,
                    formData,
                    await getHeaders(),

                );
                console.warn("userData Data:", request);
                if (request) {
                    dispatch({ type: ActionTypes.Update_Profile, payload: request });

                }
                dispatch({ type: ActionTypes.HideLoading });
            } catch (error) { }
        };
    },
    Data: ({
        callback,
    }) => {
        return async dispatch => {
            try {
                let response = await get(
                    `${APIs.DATA}`,
                    await getHeaders(),
                );
                console.warn("Terms response: ", response);
                if (response.success) {
                    callback(response);
                }
            } catch (error) {
                callback(false);
                console.warn('err ', error);
            }

        };
    },
    Contact_us: (userData, callback) => {
        return async dispatch => {
            try {
                dispatch({ type: ActionTypes.ShowLoading });
                let formData = new FormData();
                console.warn('userData Middleware', userData?.userData);
                formData.append('querry', userData?.userData?.option);
                formData.append('description', userData?.userData?.description);

                console.warn('formDataa', formData);
                let request = await POST(APIs.CONTACT_US,
                    formData,
                    await getHeaders(),

                );
                console.warn("userData Data:", request);
                if (request.success) {
                    Alert.alert('Note', request?.message)
                    // callback(request?.data)
                    dispatch({ type: ActionTypes.HideLoading });
                }
                dispatch({ type: ActionTypes.HideLoading });
            } catch (error) { }
        };
    },
    Submit_Rating: (userData, callback) => {
        return async dispatch => {
            try {
                dispatch({ type: ActionTypes.ShowLoading });
                let formData = new FormData();
                console.warn('userData Middleware', userData?.userData);
                formData.append('provider_id', userData?.userData?.provider_id);
                formData.append('rating', userData?.userData?.rate);
                formData.append('comments', userData?.userData?.comments);

                console.warn('formDataa', formData);
                let request = await POST(APIs.SUBMIT_RATING,
                    formData,
                    await getHeaders(),

                );
                console.warn("userData Data:", request);
                if (request.success) {
                    Alert.alert('Note', request?.message)
                    dispatch({ type: ActionTypes.HideLoading });
                }
                dispatch({ type: ActionTypes.HideLoading });
            } catch (error) { }
        };
    },


};
