export const APIs = {
  REGISTER: `register`,
  LOGIN: `login`,

  UPDATEPROFILE: `updateProfile`,
  // CUSTOMER_SERVICES:`customers/services/?name=${searchText ? searchText : ''}`,
  CUSTOMER_SERVICES: (next_page_url) =>
    next_page_url
      ? next_page_url
      : 'customers/services',

  DATA: `data`,
  GET_BANKS: `getBanks`,
  GET_NEWS: `getNews`,
  GET_SEMINAR: `getSeminars`,
};
