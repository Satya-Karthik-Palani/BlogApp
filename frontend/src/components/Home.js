import { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import handleBlogDelete from '../utils/handleBlogDelete';
import postContext from '../utils/postContext';
import { BACKEND_URL, CLOUDINARY_URL, DEFAULT_BLOG_IMAGE } from '../utils/constants';
import {useNavigate} from "react-router-dom"

export default function Home({url}) {
    const {setPost,setCurrpost} = useContext(postContext);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`${BACKEND_URL}/api/v1/${url}`, {
                credentials: 'include'
            });
            const json = await response.json()
            setPosts(json?.posts)
        }
        fetchPosts();
    }, [url,posts])

    const onClickHandler=(p)=>{
        setCurrpost(p);
        navigate(`/post/${p._id}`);
    }
    return (
        <>
            {!Cookies.get('isUserLoggedIn') && <h1>Not logged In</h1>}
            {Cookies.get('isUserLoggedIn') && (
                <div className="flex flex-wrap justify-center ">
                    {posts ?
                        posts.map((p) => (
                            <div
                                key={p._id}
                                className="bg-gray-300 p-5 m-5 rounded-lg w-6/12 flex justify-between">
                                <div className={url==="posts/me" ? "w-3/4 flex " : "w-full flex "} onClick={()=>onClickHandler(p)}>
                                    <img src={p.imageurl === null?DEFAULT_BLOG_IMAGE : `${CLOUDINARY_URL}${p.imageurl}.png` } className='w-40 h-40'/>
                                    <div className='px-3'>
                                        <h1 className={`font-bold ${url==="posts/me" ? 'flex justify-center pb-3':''}`}>{p.title}</h1>
                                        <div className='line-clamp-6'>
                                            <h3>{p.description}</h3>
                                        </div>
                                    </div>
                                </div>
                                {url==="posts/me" && <Link to={`/editpost/${p._id}`}><FontAwesomeIcon icon={faEdit} size="lg" color="blue" onClick={()=>setPost(p)}/></Link>}
                                {url==="posts/me" && <FontAwesomeIcon icon={faTrash} onClick={() => handleBlogDelete(p._id)} size="lg" className="text-red-500 cursor-pointer"/>}
                            </div>
                        )) : 
                        <h1>Add Your first post</h1>
                    }
                </div>
            )}
        </>
    )
}
