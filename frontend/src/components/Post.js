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

    useEffect(()=>{
        fetchcomments();
    },[comments])
    
    const fetchcomments = async()=>{
        const response = await fetch(`${BACKEND_URL}/api/v1/comments/${currpost._id}`, {
            credentials: 'include'
        });
        const json = await response.json();
        setComments(json?.comments)
    }

    return (
    <div>
        <center> <h1 className='text-2xl p-3 m-3 font-bold'>{currpost.title}</h1> </center>
        <div className='flex flex-col justify-center items-center'>
            <img alt="" className="w-6/12 p-2 m-2" src={currpost.imageurl === null?DEFAULT_BLOG_IMAGE : `${CLOUDINARY_URL}${currpost.imageurl}.png`}></img>
            <h3 className='p-2 m-2'>{currpost.description}</h3>
            <div>
                <input onChange={(e)=>setComment(e.target.value)} value={comment} placeholder="add comment..." type='text' className='m-2 p-3 w-96 border border-black rounded-lg'></input>
                <button onClick={()=>{setComment("");handleCommentPost({"description":comment,"post":currpost})}} className='p-4 m-5 bg-[#9ed5cb] text-[#445045] font-bold rounded-lg hover:text-[#9ed5cb] hover:bg-[#445045]'>Comment</button>
            </div>
            <h3 className='text-xl font-bold p-3'>Comments : </h3>
            {comments && comments.map((c)=>(
                <div key={c._id} className='bg-gray-300 p-5 m-5 rounded-lg w-6/12'>
                    <div className='flex justify-between'>
                        <h1 className='font-bold'>{c.user_name}</h1><br></br>
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
                    <h1>{c.description}</h1>
                </div>
            ))}
            <h3 className='p-2 m-2'><b>createdAt : </b>{moment(currpost.createdAt).format('h:mm:ss a')},{moment(currpost.createdAt).format('MMMM Do YYYY')}</h3>
        </div>    
    </div>
  )
}

export default Post