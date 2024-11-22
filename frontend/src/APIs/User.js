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

export const getConnections = async (email) => {
  try {
    let res = await axios.get(`${url}/getConnections?email=${email}`);
    return res;
  } catch (error) {
    console.error("Error fetching connections:", error);
  }
};


export const updateConnections = async (data) => {
  try {
    console.log("Data sent to API:", data); // Debugging
    let res = await axios.patch(`${url}/updateConnections`, data);
    return res;
  } catch (error) {
    console.error("Error in updateConnections API:", error);
  }
};

export const acceptConnection = async ({ userId, connectionRequestId }) => {
  try {
    const response = await axios.patch(`${url}/acceptConnection`, { userId, connectionRequestId });
    return response.data; // This should return success message
  } catch (error) {
    console.error("Error accepting connection:", error);
    throw error; // Ensure to handle errors in the component
  }
};

export const sendConnectionRequest = async (data) => {
  try {
    const response = await axios.post(`${url}/sendConnectionRequest`, data);
    return response.data; // Return success message
  } catch (error) {
    console.error("Error sending connection request:", error);
    throw error; // Propagate error to the component
  }
};