import axios from 'axios'

const api = axios.create({
     baseURL: "http://localhost:5000/api/inventory"
})


// const api2 = axios.create({
// 	baseURL: "http://localhost:5000/api/drivers",
// });

export default api;
