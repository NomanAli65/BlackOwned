import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://202.142.180.146:90/blackowned/api/',
  timeout: 1000,
  //headers: {Authorization: 'Bearer ' + ''},
});

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