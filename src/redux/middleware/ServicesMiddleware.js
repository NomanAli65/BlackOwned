import { APIs } from '../../configs/APIs';
import { post } from '../../configs/AxiosConfig';
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
        if (next_page_url == undefined || name) {
          dispatch({ type: ActionTypes.Reset_Customer_Services, payload: request });
        }
        // dispatch({ type: ActionTypes.ShowLoading });
        let formData = new FormData();
        formData.append('search', name);
        console.warn(formData)
        let request = await post(
          APIs.CUSTOMER_SERVICES(next_page_url),
          formData,
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

  storeService : ({ id }) => {
    // console.warn("ghgjgj", name);
    return dispatch => {
      return new Promise(async () => {
        try {
          let formData = new FormData();
          formData.append('service_id', id)
          let request = await post(
            APIs.storeService,
            formData,
            await getHeaders(),
          );
          console.warn("response=============", request)
          if (request) {
            dispatch({ type: ActionTypes.Store_Service, payload: request });
          } else {
            dispatch({ type: ActionTypes.HideLoading });
          }
        } catch (error) { }
      });
    };
  }
};
