import axios from 'axios';

const httpClient = axios.create({
  withCredentials: true, 
  timeout: 10000, 
});



export default httpClient;
