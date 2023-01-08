"use client"
import { getProviders, signIn } from 'next-auth/react'
import React from 'react'

type Props = {
    providers : Awaited<ReturnType<typeof getProviders>>;
}
export default function SignInComponent({providers}:Props) {
  return (
    <div className='flex justify-center'>
        {
            Object.values(providers!).map((provider) => (
                <div key={provider.name}>
                        <button className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
                        onClick={
                            ()=> signIn(provider.id , {
                                callbackUrl: process.env.VERCEL || "http://localhost:3000",
                            })
                        }>
                            Sign In with {provider.name}
                        </button>
                </div>
            ))
        }

    </div>
  )
}
