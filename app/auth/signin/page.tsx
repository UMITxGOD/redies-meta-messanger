import React from 'react'
import {getProviders} from 'next-auth/react'
import Image from 'next/image';
import SignInComponent from './signInComponent';
const SignIn = async () => {
    const providers = await getProviders();

  return (
    <div>
        <div>
            <Image
                className='rouded-full mx-2 object-cover' 
                src={'/meta-icon.svg'}
                width={700}
                height={700}
                alt={'Profile Pic'}
                />
                <SignInComponent providers = {providers} />
        </div>
    </div>
  )
}
export default SignIn ;
