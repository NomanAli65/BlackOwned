import { ActionTypes } from '../action_types';

let initialState = {
    getMarketPlaceSponsoredData: null,
    getMarketPlaceSponsoredData_list: [],
    getMarketPlaceProductsData: null,
    getMarketPlaceProductsData_list: [],
    storeProductData: [],
    getUserProductsData: null,
    getUserProductsData_list: [],
    loading: false,

};

export const MarketPlaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.Get_MarketPlacesSponsored:
            let getMarketPlaceSponsoredData_list_copy = [];
            getMarketPlaceSponsoredData_list_copy = [
                ...state.getMarketPlaceSponsoredData_list,
                ...action.payload.data,
            ];
            state = {
                ...state,
                getMarketPlaceSponsoredData: action.payload,
                getMarketPlaceSponsoredData_list: getMarketPlaceSponsoredData_list_copy,
            };
            break;
        case ActionTypes.Reset_Get_MarketPlacesSponsored:
            state = {
                ...state,
                getMarketPlaceSponsoredData: null,
                getMarketPlaceSponsoredData_list: [],
            };
            break;
        case ActionTypes.Get_MarketPlacesProducts:
            let getMarketPlaceProductsData_list_copy = [];
            getMarketPlaceProductsData_list_copy = [
                ...state.getMarketPlaceProductsData_list,
                ...action.payload.data,
            ];
            state = {
                ...state,
                getMarketPlaceProductsData: action.payload,
                getMarketPlaceProductsData_list: getMarketPlaceProductsData_list_copy,
            };
            break;
        case ActionTypes.Reset_Get_MarketPlacesProducts:
            state = {
                ...state,
                getMarketPlaceProductsData: null,
                getMarketPlaceProductsData_list: [],
            };
            break;

        case ActionTypes.Store_Product:
            state = { ...state, storeProductData: action.payload };
            break;

        case ActionTypes.Get_UserProducts:
            let getUserProductsData_list_copy = [];
            getUserProductsData_list_copy = [
                ...state.getUserProductsData_list,
                ...action.payload.data,
            ];
            state = {
                ...state,
                getUserProductsData: action.payload,
                getUserProductsData_list: getUserProductsData_list_copy,
            };
            break;
        case ActionTypes.Reset_Get_UserProducts:
            state = {
                ...state,
                getUserProductsData: null,
                getUserProductsData_list: [],
            };
            break;

        default:
            break;
    }
    return state;
};
