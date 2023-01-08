import { unstable_getServerSession } from 'next-auth';
import React from 'react'
import { Message } from '../typings';
import ChatInput from './chatinput';
import MessageList from './messagelist';
import Providers from './providers';


 const HomePage = async () => {
  const data = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000" }/api/getMessages`).then((res)=>res.json());
  const initialMessages : Message[] = data.messages;
  const session = await unstable_getServerSession();
  return (
    <Providers session={session} >
      {/* Message Input  */}
      <MessageList initalMessages={initialMessages}/>
      {/* Chat Messages */}
      <ChatInput session = {session} />
    </Providers>
  )
}
export default HomePage;