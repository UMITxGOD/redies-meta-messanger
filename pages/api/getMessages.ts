// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis';
import { Message } from '../../typings';

type Data = {
  messages : Message[];
}
type errorData = {
    body:string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | errorData>
) {
    if (req.method !== 'GET')
    {
        res.status(405).json({body:"Not Allowed"});
        return ;
    }
    const messageRes = await redis.hvals("messages");
    const messages : Message [] = messageRes.map((message)=> JSON.parse(message)).sort((a,b)=>a.created_at-b.created_at);
  res.status(200).json({ messages});
}
