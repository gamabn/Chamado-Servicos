import {NextResponse} from 'next/server'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import PrismaClient from "@/lib/prisma"
import {} from 'http'

export async function handler(req,res){
    if(req.method === 'DELETE'){
        const {id} = req.params
        console.log('Id do Client:',id)
        res.status(200).json({ message: 'Requisição Delete processada com sucesso' });
    }else {
        res.status(405).json({ message: 'Método não permitido' });
      }
    }
   // const session = await getServerSession(authOptions);
   // if(!session || !session.user){
   //    return NextResponse.json({error: "Not authorized"}, {status: 401})
   // }

   // const {searchParams} = new URL(req.url)
   // const userId = searchParams.get('id')
  

   // return res.status(200).json({
       // message: 'Certo'
    //})



