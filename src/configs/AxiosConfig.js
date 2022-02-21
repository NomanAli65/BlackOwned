import axios from 'axios';

export const instance = axios.create({
  // baseURL: 'http://202.142.180.146:90/blackowned/api/',
  baseURL: 'http://192.168.0.165/blackowned/api/',
  imgURL: 'http://192.168.0.165/blackowned/public/images',
  timeout: 1000,
  //headers: {Authorization: 'Bearer ' + ''},
});
export const imgURL = 'http://192.168.0.165/blackowned/public/images/'

export const post = async (url, data, config) => {
  try {
    let request = await instance.post(url, data, config);
    if (request.data.success == true) {
      return request.data.data;
    } else {
      alert(request.data.message);
    }
  } catch (error) {
    alert(error);
  }
};

export const get = async (url, config) => {
  try {
    let request = await instance.get(url, config);
    if (request.data.success == true) {
      return request.data.data;
    } else {
      alert(request.data.message);
    }
  } catch (error) {
    alert(error);
  }
};
