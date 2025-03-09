  "use client"

 import { CustomerProps } from "@/Util/customer.type"
 import PrismaClient from "@/lib/prisma"
 import { api } from "@/lib/api"
 import {useRouter} from 'next/navigation'

 export function CardCustomer({item}:{item:CustomerProps} ){
    const router = useRouter();

   async function handleDelete(){
        try{
            const response = await api.delete('/api/customer',{params:{
                id: item?.id
               }})
             console.log(response.data)
             router.refresh()

        }catch(error){
            console.log(error)
        }      
    }
    return(
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
            <h2>
                <strong  className="font-bold">Nome:</strong> {item?.name}
            </h2>
            <p><strong  className="font-bold">Email</strong> {item?.email}</p>
            <p><strong className="font-bold">Telefone</strong>{item?.phone}</p>
            <button onClick={handleDelete} className="bg-red-500 px-4 rounded text-white mt-2 self-start">
                Deletar
           </button>
        </article>
    )
}