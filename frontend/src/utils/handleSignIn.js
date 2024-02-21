import axios from "axios"
import Cookies from "js-cookie";
import toast from "react-hot-toast"
import { BACKEND_URL } from "./constants";


const handleSignIn = async(details,navigate)=>{
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/login`, details, { withCredentials: true });
        if (response.data.success) {
            toast.success("Successfully Logged in");
            Cookies.set("isUserLoggedIn", true);
            navigate("/");
        }
    } catch (error) {
        if(error?.response?.data?.message){
            toast.error(error.response.data.message);
        }
        else{
            toast.error("An error occurred. Please try again later.");
        }
    }
    
}

export default handleSignIn;