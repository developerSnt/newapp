import axios from 'axios';

const API_URL = 'https://localhost:7202/api/data';
const API_URL1 = 'https://localhost:7299/api/Registration';

const apiService = {
  async fetchData() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  async createData(formData) {
    try {
      const response = await axios.post(API_URL1, formData);
      return response.data;
    } catch (error) {
      console.error('Error creating data:', error);
      throw error;
    }
  },
};

export default apiService;
