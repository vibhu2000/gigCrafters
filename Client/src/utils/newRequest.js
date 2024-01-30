//taken out the axios work from login file and created this 
import axios from "axios";

const newRequest = axios.create({
    baseURL: "http://localhost:8800/api/",
    withCredentials: true   //without this line we will not have our accessToken 
});

export default newRequest;