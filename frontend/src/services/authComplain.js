import axios from "axios";
import { toast } from "react-toastify";

export const AllService = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/services/getallService`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
    throw error; // rethrow the error to handle it in the component
  }
}

export const AllComplaints = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/services/getallComplaints`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
    throw error; // rethrow the error to handle it in the component
  }
}

export const ReturnsCount = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/services/getallService`); // Replace with the appropriate endpoint
    const data = response.data;

    // Filter the data to count only records with cType equal to "Return"
    const returnCount = data.filter(item => item.cType === "Return").length;

    return returnCount;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
    throw error; // rethrow the error to handle it in the component
  }
}


export const RefundsCount = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/services/getallService`); // Replace with the appropriate endpoint
    const data = response.data;

    // Filter the data to count only records with cType equal to "Return"
    const refundCount = data.filter(item => item.cType === "Refund").length;

    return refundCount;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
    throw error; 
  }
}

export const getRecentComplaints = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/services/getRecentComplaints`); // Replace with the appropriate endpoint
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
    throw error; // rethrow the error to handle it in the component
  }
}
