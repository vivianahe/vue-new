import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://backend.test/api',
    headers: {
      'Content-type': 'application/json'
    }
  });
  
  export default axiosInstance;