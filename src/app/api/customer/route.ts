import {NextResponse} from 'next/server'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import PrismaClient from "@/lib/prisma"


export async function DELETE(request:Request){
    const session = await getServerSession(authOptions);
     if(!session || !session.user){     
        return NextResponse.json({error: "Not authorized"}, {status: 401})
     }

     const {searchParams} =  new URL(request.url)
     const userId = searchParams.get('id')
     console.log('Id do Cliente:',userId)
     
     if(!userId) return NextResponse.json({error: 'Invalid user id'}, {status: 401})

     try{
        await PrismaClient.customer.delete({
            where:{
                id: userId as string
            }
           
        })
       return NextResponse.json({ message: 'Cliente deletado com sucesso' });

     }catch(error){
       return NextResponse.json({ error: 'Erro ao processar a requisiçao' });
     }
        
    }
   
export async function POST(request:Request){
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
       return NextResponse.json({error: "Not authorized"}, {status: 401})
    }


    const {name, email, phone, address,userId} = await request.json();
    try{
     await PrismaClient.customer.create({
        data:{
            name:name,
            phone: phone,
            email:email,
            address: address ? address : "",
            userId:userId
        }
     })
     return NextResponse.json({message: 'Cliente cadastrado com sucesso'})
    }catch(err){
        return NextResponse.json({error: "Failed creat new customer"}, {status: 400})
    }

   
}