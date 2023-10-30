import axios from "axios"
import {toast} from "react-toastify"
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

export const validateEmail = (Email) =>{
    return Email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}


//register
export const registerUser= async(userData) =>{
    try{
        const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData)
        console.log(userData);
        if(response.statusText ==="OK"){
            toast.success("Registration successfuly!...")
            
        }

        return response.data

    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString()
        toast.error(message)

    }
}



//login
export const loginUser= async(userData) =>{
    try{
        const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData)
        console.log(userData);
        if(response.statusText ==="OK"){
            toast.success("Login successfuly!...")
            
        }

        return response.data

    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString()
        toast.error(message)

    }
}


//Get user profile
export const getUser = async () =>{
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/getUser`)
        return response.data
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)

    }
}


//Update profile
export const updateUser = async (formData) =>{
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/users/updateUser`,formData)
        return response.data
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)

    }
}


//logout user
export const logoutUser = async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/users/logout`);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };


  //change password
export const changePassword = async (formData) =>{
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/users/updatpassword`,formData)
        return response.data
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)

    }
}


//register registerStff
export const Staffregister= async(userData) =>{
    try{
        const response = await axios.post(`${BACKEND_URL}/api/users/registerstaff`, userData)
        console.log(userData);
        if(response.statusText ==="OK"){
            toast.success("Registration successfuly!...")
            
        }

        return response.data

    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString()
        toast.error(message)

    }
}


//All user
export const AllUser = async () =>{
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/AllUsers`)
        return response.data
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)

    }
}


//All user by ID
export const userById = async (userId) =>{
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/Userdetalis/${userId}`)
        return response.data
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)

    }
}



//forgot password
export const forgotPassword = async (userData) => {
    try {
     const response=  await axios.post(`${BACKEND_URL}/api/users/forgotpassword`,userData);

     toast.success(response.data.message)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };



//reset password
export const resetPassword = async (userData,resetToken) => {
    try {
     const response=  await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`,userData);

     return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };


  export const ChangeActiveStatus = async (userId) => {
    try {
      const response = await axios.patch(`${BACKEND_URL}/api/users/ChangeActiveStatus/${userId}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };


  //delete user
  export const deleteUser = async (userId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/users/removeUser/${userId}`);
      
    } catch (error) {
      throw error;
    }
  };


  //Get removerd user profile
export const getremoveUser = async () =>{
  try {
      const response = await axios.get(`${BACKEND_URL}/api/users/getremoveUser`)
      return response.data
  }catch(error){
      const message = (error.response && error.response.data && error.response.data.message
          ) || error.message || error.toString()
          toast.error(message)

  }
}