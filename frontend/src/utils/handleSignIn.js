import axios from "axios"
import Cookies from "js-cookie";
import toast from "react-hot-toast"


const handleSignIn = async(details,navigate)=>{
    const response = await axios.post("http://localhost:4000/api/v1/login",details,{withCredentials:true});
    if(response.data.success){
        toast.success("Successfully Logged in");
        Cookies.set("isUserLoggedIn",true);
        navigate("/");
    }
    else{
        toast.error(response.data.message);
    }
}

export default handleSignIn;