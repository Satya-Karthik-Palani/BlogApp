import toast from "react-hot-toast"
import axios from "axios";
import { BACKEND_URL } from "./constants";

const handleCommentPost = async (details)=>{
    const response = await axios.post(`${BACKEND_URL}/api/v1/comment/new`,details,{
        withCredentials: true
      });
    if(response.data.success===true){
        toast.success("Commented successfully")
        // navigate('/');
    }
    else{
        toast.error("Adding Comment failed")
    }
    // setLoading(false);
}

export default handleCommentPost;
