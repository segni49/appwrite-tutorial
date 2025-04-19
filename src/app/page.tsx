import '@/styles/globals.css'
import Link from 'next/link'

export default async function Home() {
 

  return (
    <div className='flex flex-col items-between justify-between min-h-screen bg-gray-100'>
   

      <main className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl'>Welcome to Note Ninja</h1>
        <p className='p'>Your personal note-taking app</p>
          <div className='links'>
          <Link href='/Login' className='Link'>Login</Link>
       <Link href='/signup' className='Link'>SignUp</Link>
     
          </div>
       </main> 
    </div>
  );
}
