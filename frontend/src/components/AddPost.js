import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import handleBlogPost from '../utils/handleBlogPost';
import { TailSpin } from "react-loader-spinner";
import Cookies from 'js-cookie';
import { DEFAULT_BLOG_IMAGE } from '../utils/constants';
import axios from 'axios';
export default function AddPost() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null)
    const [formData, setFormData] = useState(null)
    const [loading,setLoading] = useState(false);
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    
    const handleFileChange = (e) => {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append("upload_preset", "blogapp");
      setImage(e.target.files[0])
      setFormData(formData)
    }
    const onSubmitHandler = async(e)=>{
        setLoading(true);
        if (image) {
          await axios.post(`https://api.cloudinary.com/v1_1/dr6llyn4o/image/upload`, formData)
          .then(response => {
              const match = response.data.url.match(/\/v([\w-]+\/[\w-]+)/)
              handleBlogPost(navigate, setLoading, { "title":title,"description":description,"imageurl": match[1] })
          })
          .catch(error => console.log(error))
        }
        else {
          handleBlogPost(navigate,setLoading,{"title":title,"description":description,"imageurl":null})
        }
    }


  return (
    <>
      {Cookies.get("isUserLoggedIn") ?
        <div className='flex justify-between my-10 mx-60'>
          <div className='border-2 border-[#f5f5fa] bg-[#f5f5fa] cursor-pointer rounded-3xl flex justify-center w-2/5'>
            <label htmlFor="fileInput">
              <img alt='blogimage' src={image ? URL.createObjectURL(image) : DEFAULT_BLOG_IMAGE} className='h-96 w-full rounded-3xl cursor-pointer' />
              <input
                  type="file"
                  id="fileInput"
                  className='hidden'
                  onChange={handleFileChange}
                  />
            </label>
          </div>
            <div className='flex flex-col gap-y-2 w-1/3 bg-gray-300 rounded-lg p-4'>
                <h1 className='font-bold text-xl m-2'>Create new blog : </h1>
                <input onChange={(e)=>setTitle(e.target.value)} placeholder='Title of the Blog' type='text' className='m-2 p-3 border border-black rounded-lg'/>
                <textarea onChange={(e)=>setDescription(e.target.value)} placeholder='Description about the blog' type="text" className='m-2 p-3 border border-black rounded-lg'/>
                <button onClick={onSubmitHandler} className='p-4 m-5 bg-[#9ed5cb] text-[#445045] font-bold rounded-lg hover:text-[#9ed5cb] hover:bg-[#445045]'>Submit</button>
                {loading && (<TailSpin className="flex justify-center align-middle h-96"/>)}
            </div> 
        </div>
      : <div>Please Login to add post</div>}
    </>
  )
}