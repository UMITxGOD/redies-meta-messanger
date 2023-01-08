"use client";
import { signOut } from 'next-auth/react';
import React from 'react'

export default function Logoutbutton() {
  return (
    <button onClick={()=>{signOut()}} className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
        Sign Out
    </button>
  )
}
