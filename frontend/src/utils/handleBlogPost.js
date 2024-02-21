import toast from "react-hot-toast"
import axios from "axios";
import { BACKEND_URL } from "./constants";

const handleBlogPost = async (navigate,setLoading,details)=>{
    const response = await axios.post(`${BACKEND_URL}/api/v1/post/new`,details,{
        withCredentials: true
      });
    if(response.data.success===true){
        toast.success("Post successfully added")
        navigate('/');
    }
    else{
        toast.error("Adding post failed")
    }
    setLoading(false);
}

export default handleBlogPost;
