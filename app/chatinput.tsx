"use client"
import fetcher from "../utils/fetchMessages";
import { FormEvent, useState } from "react"
import useSWR from 'swr' ; 
import {v4 as uuid} from 'uuid';
import { Message } from "../typings";
import {  unstable_getServerSession } from "next-auth";
type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>> ;
}
export default function ChatInput({session}:Props) {
  const [text , setText]=useState("");
  
  const {data:messages , error , mutate } = useSWR('/api/getMessages',fetcher);
  const addMessage = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!text || !session ) return ;
    const messageToSend = text ;
    setText("");

    const message:Message = {
      id : uuid()  ,
      message:text,
      created_at:Date.now() ,
      username:  session?.user?.name! ,
      profilePic: session?.user?.image! ,
      email: session?.user?.email!,
    }
    const uploadMessageToUpstash = async () =>{
      const data = await fetch ('/api/addMessage',{
        method:'POST' ,
        headers: {
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          message
        })
      }).then(res => res.json()) ;
        return [...messages!,data.message];
    }
   await mutate(uploadMessageToUpstash,{
    optimisticData:[ ...messages! , message],
    rollbackOnError:true,
   } )
  
  }
  return (
    <div>
        <form onSubmit={addMessage} className="flex px-10 fixed bg-white bottom-0 z-50 space-x-2 py-5 w-full border-gray-100" >
        <input type="text" 
        className="flex-1 rounded px-4 py-1  border focus:outline-none focus:ring-2 focus:ring-blue-600  border-blue-300 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed "
        placeholder='Enter message here ...'
        value={text}
        disabled={!session}
        onChange = {e=>setText(e.target.value)}
        />
        <button 
        className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed" 
        disabled = {!text}
        type='submit' > send</button>
        </form>
    </div>
  )
}
