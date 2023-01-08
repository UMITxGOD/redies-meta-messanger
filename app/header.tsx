import { unstable_getServerSession } from 'next-auth';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logoutbutton from './logoutbutton';
let session:any  ;
const start = async () => {

   session = await unstable_getServerSession();
}
function  Header ()  {
  start();
  if(session)
  return (
    <header className='sticky flex top-0 z-50 bg-white justify-between items-center p-10 shadow-sm'>
      <div className='flex flex-row items-center  space-x-2 '>
      <Image  src={session?.user?.image!} alt="META" height={100} width={100}  className="rounded-full"  />
      <div className='flex flex-col space-x-2'> 
        <p className='text-xl text-blue-500'>Logged in as:</p>
        <p className='font-bold text-lg'>{session?.user?.name}</p>
      </div>
      </div>
    <Logoutbutton/>
    </header>
  );
  return (
<header className='sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm '>
  
    <div className = 'flex flex-col items-center space-y-5 '>
      <div className='flex space-x-2 items-center '>
        <Image  src={"/meta-icon.svg"} alt="META" height={100} width={100} />
        <p className='text-blue-400 '>Welcome to Meta Messanger</p>
      </div>
      <Link className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded" href={'auth/signin'}>Sign In</Link>
    </div>
</header>
  )
}
export default Header ;
