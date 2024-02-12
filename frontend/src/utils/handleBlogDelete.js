import toast from "react-hot-toast"
import axios from "axios";

const handleBlogDelete = async(id)=>{
    const response = await axios.delete(`https://blogapp-backend-3210.onrender.com/api/v1/post/${id}`,{
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