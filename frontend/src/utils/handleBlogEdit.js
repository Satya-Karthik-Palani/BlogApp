import toast from "react-hot-toast"
import axios from "axios";

const handleBlogEdit = async (navigate,setLoading,details,id)=>{
    const response = await axios.put(`https://blogapp-backend-3210.onrender.com/api/v1/post/${id}`,details,{
        withCredentials: true
      });
    if(response.data.success===true){
        toast.success("Post successfully Edited")
        navigate('/');
    }
    else{
        toast.error("Editing post failed")
    }
    setLoading(false);
}

export default handleBlogEdit;
