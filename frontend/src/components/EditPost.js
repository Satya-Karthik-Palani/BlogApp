import React, { useContext, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import handleBlogEdit from "../utils/handleBlogEdit"
import postContext from '../utils/postContext';
import axios from 'axios';
import {CLOUDINARY_URL, DEFAULT_BLOG_IMAGE} from "../utils/constants";

export default function EditPost() {
    const navigate = useNavigate();
    const {post} = useContext(postContext);
    const [loading,setLoading] = useState(false);
    const [title,setTitle] = useState(post.title);
    const [image, setImage] = useState(null)
    const [formData, setFormData] = useState(null)
    const [description,setDescription] = useState(post.description);
    const {id} = useParams();
    const onEditHandler = async(e)=>{

        setLoading(true);
        if (image) {
            await axios.post(`https://api.cloudinary.com/v1_1/dr6llyn4o/image/upload`, formData)
            .then(response => {
                const match = response.data.url.match(/\/v([\w-]+\/[\w-]+)/)
                handleBlogEdit(navigate, setLoading, { "title":title,"description":description,"imageurl": match[1] },id)
            })
            .catch(error => console.log(error))
        }
        else {
            handleBlogEdit(navigate,setLoading,{"title":title,"description":description,"imageurl":null},id)
        }

        setLoading(true);
        
    }

    const handleFileChange = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append("upload_preset", "blogapp");
        setImage(e.target.files[0])
        setFormData(formData)
    }

  return (
    <>
        <div className='flex justify-between my-10 mx-60'>
            <div className='border-2 border-[#f5f5fa] bg-[#f5f5fa] cursor-pointer rounded-3xl flex justify-center w-2/5'>
                <label htmlFor="fileInput">
                    <img alt='blogimage' src={image ? URL.createObjectURL(image) : post.imageurl===null ? DEFAULT_BLOG_IMAGE : `${CLOUDINARY_URL}${post.imageurl}.png`  } className='h-96 w-full rounded-3xl cursor-pointer' />
                    <input
                        type="file"
                        id="fileInput"
                        className='hidden'
                        onChange={handleFileChange}
                        />
                </label>
            </div>
            <div className='flex flex-col gap-y-2 w-1/3 bg-gray-300 rounded-lg p-4'>
                <h1 className='font-bold text-xl m-2'>Edit Your blog : </h1>
                <input onChange={(e)=>setTitle(e.target.value)} defaultValue={post.title} placeholder='Title of the Blog' type='text' className='m-2 p-3 border border-black rounded-lg'/>
                <textarea onChange={(e)=>setDescription(e.target.value)} defaultValue={post.description} placeholder='Description about the blog' type="text" className='m-2 p-3 border border-black rounded-lg'/>
                <button onClick={onEditHandler} className='p-4 m-5 bg-[#9ed5cb] text-[#445045] font-bold rounded-lg hover:text-[#9ed5cb] hover:bg-[#445045]'>Edit Post</button>
                {loading && (<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                              <CircularProgress color="inherit" />
                            </Backdrop>)}
            </div>
        </div>
    </>
  )
}
