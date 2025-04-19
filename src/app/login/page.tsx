'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {useAuth} from '@/context/useauth';
import appwriteService from '../actions/noteAction';
import Link from 'next/link';
import '@/styles/home.css';

export default function loginpage() {

  const router = useRouter();
  const [formdata, setformdata] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('');
  const {setAuthStatus} = useAuth();
      const Handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const session = await appwriteService.login(formdata);
        if (session) {
          setAuthStatus(true);
          router.push('/notes')
        }
      }  
  return (
    <div className='container'>
        <h1>SignUp </h1>
        <form className='flex flex-col' onSubmit={Handlelogin}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={formdata.email} onChange={(e) => setformdata({...formdata, email: e.target.value})} required/>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' value={formdata.password} onChange={(e)=> setformdata({...formdata, password:e.target.value})} required/>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}
