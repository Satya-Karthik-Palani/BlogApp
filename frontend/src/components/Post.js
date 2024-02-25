import React, { useContext, useEffect, useState } from 'react'
import postContext from '../utils/postContext';
import { BACKEND_URL, CLOUDINARY_URL, DEFAULT_BLOG_IMAGE } from '../utils/constants';
import moment from 'moment';
import handleCommentPost from '../utils/handleCommentPost';
const HumanizeDuration = require('humanize-duration')

const Post = () => {
    const [comment,setComment] = useState("");
    const [comments,setComments] = useState([]);
    const {currpost} = useContext(postContext);
    const [author,setAuthor] = useState("");
    useEffect(()=>{
        fetchdetails();
    },[comments])
    
    const fetchdetails = async()=>{
        const response = await fetch(`${BACKEND_URL}/api/v1/comments/${currpost._id}`, {
            credentials: 'include'
        });
        const json = await response.json();
        setComments(json?.comments)
        const res = await fetch(`${BACKEND_URL}/api/v1/getuser/${currpost.user}`)
        const author = await res.json();
        setAuthor(author?.user?.name);
    }

    return (
    <div>
        <center> <h1 className='text-2xl p-3 m-3 font-bold text-black dark:text-white'>{currpost.title}</h1> </center>
        <div className='flex flex-col justify-center items-center'>
            <div className='flex w-3/5 justify-between'>
                <img alt="" className="w-6/12 p-2 m-2" src={currpost.imageurl === null?DEFAULT_BLOG_IMAGE : `${CLOUDINARY_URL}${currpost.imageurl}.png`}></img>
                <div className='p-2 m-2 text-black dark:text-white'>
                    <h1><b>Author : </b>{author}</h1>
                    <h3><b>Posted On : </b>{moment(currpost.createdAt).format('MMMM Do YYYY')},{moment(currpost.createdAt).format('h:mm a')}</h3>
                </div>
            </div>
            <p className='p-2 m-2 w-3/5 text-black dark:text-white'>{currpost.description}</p>
            <div className='p-2 m-2 w-3/5 flex justify-center'>
                <textarea onChange={(e)=>setComment(e.target.value)} value={comment} placeholder="add comment..." type='text' className='m-2 p-3 w-3/4 border border-black rounded-lg'></textarea>
                <button onClick={()=>{setComment("");handleCommentPost({"description":comment,"post":currpost})}} className='p-4 m-5 bg-[#9ed5cb] text-[#445045] font-bold rounded-lg hover:text-[#9ed5cb] hover:bg-[#445045]'>Comment</button>
            </div>
            <h3 className='text-xl font-bold p-3 text-black dark:text-white'>Comments : </h3>
            {comments && comments.map((c)=>(
                <div key={c._id} className='bg-gray-300 p-5 m-5 rounded-lg w-6/12 dark:bg-[#2f3335]'>
                    <div className='flex justify-between text-black dark:text-white'>
                        <h1 className='font-bold '>{c.user_name}</h1><br></br>
                        <h1>{HumanizeDuration(Date.now() - new Date(c.createdAt), {
                            largest: 1,
                            units: ['d', 'h', 'm'], 
                            round: true,
                            conjunction: ' and ', 
                            serialComma: false,
                            callback: function(string) {
                                if(string === 'less than a minute') {
                                    return 'now';  
                                }
                        
                                return string;
                            } 
                        })} ago</h1>
                    </div>
                    <h1 className='text-black dark:text-white'>{c.description}</h1>
                </div>
            ))}
        </div>    
    </div>
  )
}

export default Post