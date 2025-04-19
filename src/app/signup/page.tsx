'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {useAuth} from '@/context/useauth';
import appwriteService from '../actions/noteAction';
import Link from 'next/link';
import '@/styles/home.css';

export default function SignUp() {
     const {setAuthStatus} = useAuth(); 
    const [formdata, setformdata] = useState({
        email: '',
        password: '',
        name: '',  
    })
    const router = useRouter()
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

   async function handleSubmmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

       try {
           const userData = await appwriteService.createUserAccount(formdata);
             if(userData) {
                setAuthStatus(true);
                setSuccess(true);
                router.push('/login')
             }
            }
            catch (err: unknown) {
                if(err instanceof Error) {
                    setError(err.message);
                    console.log(error);
        
       }  }
       
   } 
  return (
    <div className='container'>
        <h1>SignUp </h1>
        <form className='flex flex-col' onSubmit={handleSubmmit}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={formdata.email} onChange={(e) => setformdata({...formdata, email: e.target.value})} required/>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' value={formdata.name} onChange={(e)=> setformdata({...formdata, name:e.target.value})} required/>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' value={formdata.password} onChange={(e)=> setformdata({...formdata, password:e.target.value})} required/>
            <button type='submit'>SignUp</button>
        </form>
    </div>
  )
}
