import axios from "axios"
import toast from "react-hot-toast"
import Cookies from 'js-cookie'

const handleSignup = async(details,navigate)=>{
    try{
        const response = await axios.post("https://blogapp-backend-3210.onrender.com/api/v1/register",details,{withCredentials:true});
        if(response.data.success===true){
            toast.success(response.data.message);
            Cookies.set("isUserLoggedIn",true);
            navigate("/");
        }
        else{
            console.log(reponse.data.message);
            toast.error(response.data.message);
        }
    }catch (error) {
        toast.error("An error occurred. Please try again later.");
        console.error("Error:", error);
    }

}
export default handleSignup;