import axios from "axios"
import toast from "react-hot-toast"
import Cookies from 'js-cookie'

const handleSignup = async(details,navigate)=>{
    const response = await axios.post("https://blogapp-backend-3210.onrender.com/api/v1/register",details,{withCredentials:true});
    if(response.data.success===true){
        toast.success(response.data.message);
        Cookies.set("isUserLoggedIn",true);
        navigate("/");
    }
    else{
        toast.error(response.data.message);
    }
}
export default handleSignup;