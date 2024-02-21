import axios from "axios"
import Cookies from "js-cookie";
import toast from "react-hot-toast"


const handleSignIn = async(details,navigate)=>{
    try {
        const response = await axios.post("https://blogapp-backend-3210.onrender.com/api/v1/login", details, { withCredentials: true });
        if (response.data.success) {
            toast.success("Successfully Logged in");
            Cookies.set("isUserLoggedIn", true);
            navigate("/");
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        toast.error("An error occurred. Please try again later.");
        console.error("Error:", error);
    }
    
}

export default handleSignIn;