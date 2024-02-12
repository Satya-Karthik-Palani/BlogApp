import toast from "react-hot-toast"
import axios from "axios";

const handleBlogPost = async (navigate,setLoading,details)=>{
    const response = await axios.post("https://blogapp-backend-3210.onrender.com/api/v1/post/new",details,{
        withCredentials: true
      });
    console.log(response);
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
