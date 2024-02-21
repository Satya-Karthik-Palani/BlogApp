import toast from "react-hot-toast"
import axios from "axios";
import { BACKEND_URL } from "./constants";

const handleBlogDelete = async(id)=>{
    const response = await axios.delete(`${BACKEND_URL}/api/v1/post/${id}`,{
        withCredentials: true
    });
    if(response.data.success===true){
        toast.success("Post successfully Deleted")
    }
    else{
        toast.error("Deleting post failed")
    }
}
export default handleBlogDelete;