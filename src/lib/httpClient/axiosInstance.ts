import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true, 
  timeout: 10000, 
});



export default axiosInstance;
