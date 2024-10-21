import axios from 'axios';
import config from './config.centralized'; // Import the config based on environment

const axiosInstance = axios.create({
  baseURL: config.apiUrl, // This will be 'http://156.67.214.40:8081/api/' in production
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;