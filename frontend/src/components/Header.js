import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import {useNavigate} from "react-router-dom";
import handleLogout from '../utils/handleLogout';

export default function Header({themeSwitchHandler}) {
  const isUserLoggedIn = Cookies.get("isUserLoggedIn");
  const navigate = useNavigate();

  return (
    <div className='flex bg-gray-300 justify-between border border-y-[#222221] border-l-0 border-r-0 dark:bg-[#2f3335] border border-y-white border-l-0 border-r-0'>
        <div className='w-32 rounded-lg'>
            <img src="./Images/logo.png" alt='img not found'></img>
        </div>
        <div className='absolute w-full justify-center'>
            <ul className='flex justify-center'>
                <Link to="/" className='p-4 m-5 bg-[#9ed5cb] text-[#445045] font-bold rounded-lg hover:text-[#9ed5cb] hover:bg-[#445045] '>Community</Link>
                <Link to="/me" className='p-4 m-5 bg-[#9ed5cb] text-[#445045] font-bold rounded-lg hover:text-[#9ed5cb] hover:bg-[#445045] '>My Blogs</Link>
                {isUserLoggedIn ? <button onClick={()=>handleLogout(navigate)} className='p-4 m-5 bg-[#9ed5cb] text-[#445045] font-bold rounded-lg hover:text-[#9ed5cb] hover:bg-[#445045] '>Logout</button>:<Link to="/signup" className='p-4 m-5 bg-[#9ed5cb] text-[#445045] font-bold rounded-lg hover:text-[#9ed5cb] hover:bg-[#445045]'>Signup</Link>}
                <div type="button" onClick={themeSwitchHandler} className='p-4 m-5 bg-[#9ed5cb] text-[#445045] font-bold rounded-lg hover:text-[#9ed5cb] hover:bg-[#445045] cursor-pointer'>Toggle Theme</div>
            </ul>
        </div>
    </div>
  )
}
