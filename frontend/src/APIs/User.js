import axios from "axios";
const url = "http://localhost:8080";
export const signUp = async (data) => {
  try {
    let res = await axios.post(`${url}/signUp`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const logIn = async (data) => {
  try {
    let res = await axios.post(`${url}/logIn`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    let res = await axios.get(`${url}/getAllUsers`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (data) => {
  try {
    console.log(data);
    let res = await axios.patch(`${url}/updateUser`,data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
