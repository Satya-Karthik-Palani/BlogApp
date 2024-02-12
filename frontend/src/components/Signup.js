import React, { useState } from 'react'
import handleSignup from '../utils/handleSignup';
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import handleSignIn from '../utils/handleSignIn';
export default function Signup({isSignUp}) {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();
  return (
    <div className='flex justify-center mt-8'>
        <div className='flex flex-col gap-y-2 w-1/3 bg-gray-300 rounded-lg p-4'>
            {isSignUp ? (<h1 className='font-bold text-xl m-2'>Signup  : </h1>) : (<h1 className='font-bold text-xl m-2'>Log In : </h1>)}
            {isSignUp && <input onChange={(e)=>setUsername(e.target.value)} placeholder='User Name' type='text' className='m-2 p-3 border border-black rounded-lg'/>}
            <input onChange={(e)=>setEmail(e.target.value)} placeholder='Email' type="email" className='m-2 p-3 border border-black rounded-lg'/>
            <input onChange={(e)=>setPassword(e.target.value)} placeholder='Password' type="password" className='m-2 p-3 border border-black rounded-lg'/>
            {isSignUp ? <button onClick={()=>handleSignup({username,email,password},navigate)} className='p-4 m-5 text-xl bg-[#9ed5cb] text-[#445045] font-bold rounded-lg hover:text-[#9ed5cb] hover:bg-[#445045]'>Submit</button> : <button onClick={()=>handleSignIn({email,password},navigate)} className='p-4 m-5 text-xl bg-[#9ed5cb] text-[#445045] font-bold rounded-lg hover:text-[#9ed5cb] hover:bg-[#445045]'>Login</button>}
            <div className='flex justify-center'>
            {isSignUp && <h1 className='text-xl ml-5 font-bold'>Have an account? <Link to="/signin" className="text-xl p-2 m-2 bg-[#9ed5cb] text-[#445045] font-bold rounded-lg hover:text-[#9ed5cb] hover:bg-[#445045]">Sign In</Link></h1>}
            </div>
        </div>
    </div>
  )
}
