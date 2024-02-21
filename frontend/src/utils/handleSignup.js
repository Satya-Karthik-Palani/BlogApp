import axios from "axios"
import toast from "react-hot-toast"
import Cookies from 'js-cookie'

const handleSignup = async(details,navigate)=>{
    try{
        const response = await axios.post("https://blogapp-backend-3210.onrender.com/api/v1/register",details,{withCredentials:true});
        console.log(response.data.message);
        if(response.data.success===true){
            toast.success(response.data.message);
            Cookies.set("isUserLoggedIn",true);
            navigate("/");
        }
    }catch (error) {
        if(error?.response?.data?.message){
            toast.error(error.response.data.message);
        }
        else{
            toast.error("An error occurred. Please try again later.");
        }
    }

}
export default handleSignup;