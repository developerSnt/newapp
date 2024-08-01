import axios from 'axios';

const API_URL = 'https://localhost:7202/api/data';
const API_URL1 = 'https://localhost:7299/api/Registration';
const API_URL2 = 'https://localhost:7299/api/NewsList';
const API_URL3 = 'https://localhost:7299/api/insetdatainfo';
const API_URL4 = 'https://localhost:7299/api/insetdatainfo';
const API_URL5 = 'https://localhost:7299/api/InsertnewData1';
const apiService = {
  async fetchData() {
    try {
      const response = await axios.get(API_URL);
      const response1 = await axios.get(API_URL2);
      return response1.data1;
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
  async createData1(formData) {
    try {
      const response = await axios.post(API_URL3, formData);
      return response.data;
    } catch (error) {
      console.error('Error creating data:', error);
      throw error;
    }
  },
  async createData2(formData) {
    try {
      const response = await axios.post(API_URL5, formData);
      return response.data;
    } catch (error) {
      console.error('Error creating data:', error);
      throw error;
    }
  },
  async createData1(selectedItem) {
    try {
      const response = await axios.post(API_URL3, selectedItem);
      return response.data;
    } catch (error) {
      console.error('Error creating data:', error);
      throw error;
    }
  },
};

export default apiService;
