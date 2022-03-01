import { APIs } from '../../configs/APIs';
import { baseURL, get, post, POST } from '../../configs/AxiosConfig';
import { ActionTypes } from '../action_types';
import { getHeaders } from '../../Utils';
import Storage from '../../Utils/AsyncStorage';
import axios, { Axios } from 'axios';
import { Alert } from 'react-native';
// import AuthAction from '../Actions/AuthAction';
import RNFetchBlob from 'rn-fetch-blob';

export const PostMiddleware = {

    Store_Post: userData => {
        return async dispatch => {
            let headers = (await getHeaders()).headers
            await RNFetchBlob.fetch("POST", baseURL + APIs.STORE_POST,
                headers,
                [{
                    name: "type",
                    data: userData?.userData?.type + ""
                }, {
                    name: "description",
                    data: ""
                }, {
                    name: "thumbnail",
                    filename: userData?.userData?.thumbnail?.name,
                    data: RNFetchBlob.wrap(userData?.userData?.thumbnail?.uri)
                }, {
                    name: "media",
                    filename: userData?.userData?.media?.name,
                    data: RNFetchBlob.wrap(userData?.userData?.media?.uri)
                },]
            ).uploadProgress((sent, total) => {
                userData.uploading(sent, total);
            }).then((request) => {
                console.warn(request.data)
                //  dispatch({ type: ActionTypes.Own_Post, payload: { data: JSON.parse(request.data.data) } });
                userData.callback()
                //console.warn()
            }).catch((err) => {
                console.warn("error", err);
            })
            //dispatch({ type: ActionTypes.HideLoading });
            // try {
            //     console.warn("UserData:", userData);
            //     // dispatch({ type: ActionTypes.ShowLoading });
            //     let formData = new FormData();

            //     formData.append('media', userData?.userData?.media);
            //     formData.append('type', userData?.userData?.type);
            //     formData.append('description', '');
            //     // userData.userData.thumbnail != '' ?
            //     //     formData.append('thumbnail', userData?.userData?.thumbnail) : null;

            //     // console.warn('formDataa', formData);
            //     let request = await POST(APIs.STORE_POST,
            //         formData,
            //         await getHeaders(),
            //     );
            //     // console.warn("Store Post:", request);
            //     if (request) {
            //         dispatch({ type: ActionTypes.Own_Post, payload: request });
            //     }
            //     //  dispatch({ type: ActionTypes.HideLoading });
            // } catch (error) { }
        };
    },
    Show_User_Post: () => {
        return async dispatch => {
            try {
                dispatch({ type: ActionTypes.ShowLoading });
                let response = await get(
                    `${APIs.SHOW_USER_POST}`,
                    await getHeaders(),
                );
                console.warn("Show POst: ", response.data);
                if (response.success) {
                    dispatch({ type: ActionTypes.Own_Post, payload: response });
                    dispatch({ type: ActionTypes.HideLoading });
                }
            } catch (error) {
                console.warn('err ', error);
                dispatch({ type: ActionTypes.HideLoading });
            }

        };
    },
    Delete_Post: userData => {
        return async dispatch => {
            try {

                // dispatch({ type: ActionTypes.ShowLoading });
                let formData = new FormData();

                formData.append('id', userData?.userData?.id);
                console.warn('formDataa', formData);
                let request = await POST(APIs.DELETE_POST,
                    formData,
                    await getHeaders(),
                );

                if (request) {
                    dispatch({ type: ActionTypes.Own_Post, payload: request });
                    Alert.alert('Note', request?.message)
                }
                // dispatch({ type: ActionTypes.HideLoading });
            } catch (error) { }
        };
    },
    Show_Other_User_Post: ({ id, callback }) => {

        return async dispatch => {
            try {
                dispatch({ type: ActionTypes.ShowLoading });
                let response = await get(
                    `${APIs.SHOW_USER_POST}/${id}`,
                    await getHeaders(),
                );
                console.warn("Show other POst: ", response);
                if (response.success) {
                    callback(response)
                    dispatch({ type: ActionTypes.HideLoading });
                }
            } catch (error) {
                console.warn('err ', error);
                callback(false)
                dispatch({ type: ActionTypes.HideLoading });
            }

        };
    },

};
