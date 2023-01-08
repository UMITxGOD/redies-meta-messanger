"use client"
import fetcher from '../utils/fetchMessages';
import useSWR from 'swr' ; 
import { Message } from '../typings';
import MessageComponent from './messageComponent';
import { useEffect } from 'react';
import { clientPusher } from '../pusher';

type Props = {
  initalMessages:Message[] ;
}

export default function MessageList({initalMessages}:Props) {
  const {data:messages , error , mutate } = useSWR<Message[]>('/api/getMessages',fetcher);
  useEffect(()=>{
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message" , async(data:Message)=> {
      //If Already Message is sent to pusher then don't send
      if(messages?.find((message)=> message.id === data.id))  return ;
      if(!messages){
        mutate(fetcher) ;
      }
      else {
        mutate(fetcher , {
          optimisticData: [...messages! , data] ,
          rollbackOnError:true 
        })
      }
        
      })
      return ()=>{
        channel.unbind_all() ;
        channel.unsubscribe();
      }
  },[messages , mutate , clientPusher])
  return (
    <div className='flex flex-col  space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto'>
          {
            (messages||initalMessages)?.map((message) => (
              <MessageComponent key={message.id} message = {message} />
            ))
          }
    </div>
  )
}



