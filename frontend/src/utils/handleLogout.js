import axios from "axios"
import Cookies from "js-cookie";
import toast from "react-hot-toast"
import { BACKEND_URL } from "./constants";

const handleLogout = async(navigate)=>{
    const response = await axios.get(`${BACKEND_URL}/api/v1/logout`);
    if(response.data.success){
        toast.success(response.data.message);
        Cookies.remove("isUserLoggedIn");
        navigate("/signup");
    }
    else{
        toast.error(response.data.message);
    }
}

export default handleLogout;