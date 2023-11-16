import axios from "axios";


export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

export const backendApi = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})

// api.interceptors.response.use(
//     function (response){
//         return response;
//     },

//     function (error){
//         const status = error?.response?.status;

//         if(status === 401 || status === 404){
//             console.log('error from config file.')
//         }

//         return Promise.reject(error)
//     }

// )
