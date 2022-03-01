import { APIs } from '../../configs/APIs';
import { post } from '../../configs/AxiosConfig';
import { ActionTypes } from '../action_types';
import { getHeaders } from '../../Utils';
import Storage from '../../Utils/AsyncStorage';
import axios, { Axios } from 'axios';
// import AuthAction from '../Actions/AuthAction';

export const MarketPlaceMiddleware = {

  getAllMarketPlacesSponsored: ({ next_page_url, name }) => {
    return async dispatch => {

      // return new Promise(async (resolve, reject) => {
      try {
        if (next_page_url == undefined || name) {
          dispatch({ type: ActionTypes.Reset_Get_MarketPlacesSponsored, payload: request });
        }
        // dispatch({ type: ActionTypes.ShowLoading });
        let formData = new FormData();
        formData.append('search', name);
        // console.warn('search', formData)
        let request = await post(
          APIs.marketPlaceSponsored(next_page_url),
          formData,
          await getHeaders(),
        );
        // console.warn('request', request?.success);
        if (request) {
          dispatch({ type: ActionTypes.Get_MarketPlacesSponsored, payload: request });
        } else {
          dispatch({ type: ActionTypes.HideLoading });
        }
      } catch (error) { }
      // });
    };
  },
  getAllMarketPlacesProducts: ({ next_page_url, name }) => {
    return async dispatch => {

      // return new Promise(async (resolve, reject) => {
      try {
        if (next_page_url == undefined || name) {
          dispatch({ type: ActionTypes.Reset_Get_MarketPlacesProducts, payload: request });
        }
        // dispatch({ type: ActionTypes.ShowLoading });
        let formData = new FormData();
        formData.append('search', name);
        // console.warn('search', formData)
        let request = await post(
          APIs.marketPlaceProducts(next_page_url),
          formData,
          await getHeaders(),
        );
        // console.warn('request', request?.success);
        if (request) {
          dispatch({ type: ActionTypes.Get_MarketPlacesProducts, payload: request });
        } else {
          dispatch({ type: ActionTypes.HideLoading });
        }
      } catch (error) { }
      // });
    };
  },

  getAllUserProducts: ({ next_page_url, name }) => {
    return async dispatch => {

      // return new Promise(async (resolve, reject) => {
      try {
        if (next_page_url == undefined || name) {
          dispatch({ type: ActionTypes.Reset_Get_UserProducts, payload: request });
        }
        // dispatch({ type: ActionTypes.ShowLoading });
        let formData = new FormData();
        formData.append('search', name);
        // console.warn('search', formData)
        let request = await post(
          APIs.getAllUserProducts(next_page_url),
          formData,
          await getHeaders(),
        );
        // console.warn('request', request?.success);
        if (request) {
          dispatch({ type: ActionTypes.Get_UserProducts, payload: request });
        } else {
          dispatch({ type: ActionTypes.HideLoading });
        }
      } catch (error) { }
      // });
    };
  },

  storeProduct: ({ name, price, discounted_price, description, image }) => {
    // console.warn("ghgjgj", name);
    return async dispatch => {
      // return new Promise(async () => {
      try {
        dispatch({ type: ActionTypes.ShowLoading });
        let formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('discounted_price', discounted_price);
        formData.append('description', description);
        formData.append('image', image);
        // console.warn('formData', formData)
        let request = await post(
          APIs.storeProduct,
          formData,
          await getHeaders(),
        );
        // console.warn("response=============", request?.success)
        if (request.success) {
          dispatch({ type: ActionTypes.Store_Product, payload: request });
        } else {
          dispatch({ type: ActionTypes.HideLoading });
        }
      } catch (error) { }
      // });
    };
  },

  promoteProduct: ({ productid }) => {
    // console.warn("ghgjgj", name);
    return async dispatch => {
      // return new Promise(async () => {
      try {
        dispatch({ type: ActionTypes.ShowLoading });
        let formData = new FormData();
        formData.append('productid', productid);
        
        // console.warn('formData', formData)
        let request = await post(
          APIs.updateProductStatus,
          formData,
          await getHeaders(),
        );
        // console.warn("response=============", request?.success)
        if (request.success) {
          dispatch({ type: ActionTypes.Promote_Product, payload: request });
        } else {
          dispatch({ type: ActionTypes.HideLoading });
        }
      } catch (error) { }
      // });
    };
  },

};
