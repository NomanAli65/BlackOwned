export const APIs = {
  REGISTER: `register`,
  LOGIN: `login`,

  UPDATEPROFILE: `customers/updateProfile`,
  // CUSTOMER_SERVICES:`customers/services/?name=${searchText ? searchText : ''}`,
  CUSTOMER_SERVICES: (next_page_url) =>
    next_page_url
      ? next_page_url
      : 'customers/services',
  storeService: `provider/storeService`,
  removeService: `provider/removeService`,

  DATA: `data`,
  getBanks: (next_page_url) =>
    next_page_url
      ? next_page_url
      : 'customers/getBanks',
  getNews: (next_page_url) =>
    next_page_url
      ? next_page_url
      : 'customers/getNews',
  getSeminars: (next_page_url) =>
    next_page_url
      ? next_page_url
      : 'customers/getSeminars',
  getCompanies: (next_page_url) =>
    next_page_url
      ? next_page_url
      : 'customers/getCompanies',

  marketPlaceSponsored: (next_page_url) =>
    next_page_url
      ? next_page_url
      : 'customers/marketPlaceSponsored',
  marketPlaceProducts: (next_page_url) =>
    next_page_url
      ? next_page_url
      : 'customers/marketPlaceProducts',

  storeProduct: `customers/storeProduct`,

  getAllUserProducts: (next_page_url) =>
    next_page_url
      ? next_page_url
      : 'customers/getAllProducts',

  GET_SEMINAR: `getSeminars`,
  SERVICE_INDEX: `provider/serviceIndex`,
  CONTACT_US: `customers/contactUs`,
  SUBMIT_RATING: `customers/submitRating`,
  PROVIDER_RATING: `provider/getProviderRating`,

};
