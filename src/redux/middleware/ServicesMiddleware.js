import { APIs } from '../../configs/APIs';
import { post, get } from '../../configs/AxiosConfig';
import { ActionTypes } from '../action_types';
import { getHeaders } from '../../Utils';
import Storage from '../../Utils/AsyncStorage';
// import AuthAction from '../Actions/AuthAction';

export const ServicesMiddleware = {
  // Login: userData => {
  //   return async dispatch => {
  //     try {
  //       dispatch({type: ActionTypes.ShowLoading});
  //       let formData = new FormData();
  //       formData.append('email', userData.email);
  //       formData.append('password', userData.password);
  //       let request = await post(APIs.LOGIN, formData);
  //       if (request) {
  //         dispatch({type: ActionTypes.Register, payload: request});
  //       }
  //       dispatch({type: ActionTypes.HideLoading});
  //     } catch (error) {}
  //   };
  // },

  getAllServices: ({ next_page_url, name }) => {
    return async dispatch => {

      // return new Promise(async (resolve, reject) => {
      try {
        if (next_page_url == undefined) {
          dispatch({ type: ActionTypes.Reset_Customer_Services });
        }
        // dispatch({ type: ActionTypes.ShowLoading });
        let formData = new FormData();

        // if (name) 
        formData.append('search', name);
        let request = await post(
          APIs.CUSTOMER_SERVICES(next_page_url),
          // name ? formData : 
          {},
          await getHeaders(),
        );
        console.warn('request', request);
        if (request) {
          dispatch({ type: ActionTypes.Customer_Services, payload: request });
        } else {
          dispatch({ type: ActionTypes.HideLoading });
        }
      } catch (error) { }
      // });
    };
  },
  Service_Index: ({
    callback,
  }) => {
    return async dispatch => {
      try {
        let response = await get(
          `${APIs.SERVICE_INDEX}`,
          await getHeaders(),
        );
        console.warn("ServicesIndex response: ", response);
        if (response.success) {
          callback(response);
        }
      } catch (error) {
        callback(false);
        console.warn('err ', error);
      }

    };
  },
};
