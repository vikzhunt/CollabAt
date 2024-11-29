import axios from "axios";
const url = "http://localhost:8080";

export const uploadBlog = async (data) => {
    try {
      const res = await axios.post(`${url}/uploadBlog`, data);
      return res;
    } catch (error) {
      console.error('Error in updateBlog API call:', error.response?.data || error.message);
      throw error;
    }
};

export const getAllBlogs = async () => {
  try {
    let res = await axios.get(`${url}/getAllBlogs`);
    return res;
  } catch (error) {
    console.log(error);
  }
};