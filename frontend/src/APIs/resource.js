import axios from "axios";
const url = "http://localhost:8080";

export const uploadResource = async (data) => {
    try {
      const res = await axios.post(`${url}/uploadResource`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res;
    } catch (error) {
      console.error('Error in updateUser API call:', error.response?.data || error.message);
      throw error;
    }
};

export const getAllResources = async () => {
  try {
    let res = await axios.get(`${url}/getAllResources`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
