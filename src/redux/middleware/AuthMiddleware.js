import { APIs } from '../../configs/APIs';
import { post } from '../../configs/AxiosConfig';
import { ActionTypes } from '../action_types';
import { getHeaders } from '../../Utils';
import Storage from '../../Utils/AsyncStorage';
// import AuthAction from '../Actions/AuthAction';

export const AuthMiddleware = {
  Register: userData => {
    return async dispatch => {
      dispatch({ type: ActionTypes.ShowLoading });
      try {
        let formData = new FormData();
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('confirm_password', userData.c_password);
        formData.append('city', userData.city);
        formData.append('role', userData.userType);
        formData.append('phone', userData.phone);
        if (userData.provider)
          formData.append('provider_as', userData.provider);
        if (userData.company_name)
          formData.append('company_name', userData.company_name);
        formData.append('lat', userData.lat);
        formData.append('lng', userData.lng);
        formData.append('company_address', userData.geoLocationAddress);
        let request = await post(APIs.REGISTER, formData);
        if (request) {
          dispatch({ type: ActionTypes.Register, payload: request });
        }
        dispatch({ type: ActionTypes.HideLoading });
      } catch (error) { }
    };
  },
  Login: userData => {
    return async dispatch => {
      try {
        dispatch({ type: ActionTypes.ShowLoading });
        let formData = new FormData();
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        let request = await post(APIs.LOGIN, formData);
        console.warn("Login Data:", request);
        if (request) {
          console.warn(request);
          await Storage.setToken(request.token);
          await Storage.set("@BB-user", JSON.stringify(request))
          dispatch({ type: ActionTypes.Login, payload: request });
        }
        dispatch({ type: ActionTypes.HideLoading });
      } catch (error) { }
    };
  },
};
