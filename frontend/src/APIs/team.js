import axios from "axios";
const url = "http://localhost:8080";

export const createTeam = async (data) => {
    try {
      let res = await axios.post(`${url}/teams`, data);
      return res;
    } catch (error) {
      console.log(error);
    }
};


export const joinTeam = async (data) => {
    try {
      const response = await axios.post(`${url}/teams/join`, data);
      return response.data;
    } catch (error) {
      console.error("Error joining team:", error);
      throw error;
    }
};

export const sendMessage = async (data) => {
    try {
      const res = await axios.post(`${url}/teams/sendMessage`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res;
    } catch (error) {
      console.error('Error in sending message or file: ', error.response?.data || error.message);
      throw error;
    }
};

export const getAllTeams = async () => {
  try {
    let res = await axios.get(`${url}/getAllTeams`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
