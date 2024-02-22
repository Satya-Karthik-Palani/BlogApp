import React, { useContext } from 'react'
import postContext from '../utils/postContext';
import { CLOUDINARY_URL, DEFAULT_BLOG_IMAGE } from '../utils/constants';
import moment from 'moment';

function Post() {
    const {currpost} = useContext(postContext);
    return (
    <div>
        <center> <h1 className='text-2xl p-3 m-3 font-bold'>{currpost.title}</h1> </center>
        <div className='flex flex-col justify-center items-center'>
            <img className="w-6/12 p-2 m-2" src={currpost.imageurl === null?DEFAULT_BLOG_IMAGE : `${CLOUDINARY_URL}${currpost.imageurl}.png`}></img>
            <h3 className='p-2 m-2'>{currpost.description}</h3>
            <h3 className='p-2 m-2'><b>createdAt : </b>{moment(currpost.createdAt).format('h:mm:ss a')},{moment(currpost.createdAt).format('MMMM Do YYYY')}</h3>
        </div>    
    </div>
  )
}

export default Post