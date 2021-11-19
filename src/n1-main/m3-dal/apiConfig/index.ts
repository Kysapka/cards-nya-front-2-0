import axios from 'axios';

const settings = {
  withCredentials: true,
  // headers: {
  //   'API-KEY': process.env.REACT_APP_API_KEY,
  // },
};

export const axiosInst = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0',
  // process.env.REACT_APP_BASE_URL,
  ...settings,
});
