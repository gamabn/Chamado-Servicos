import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CardCustomer } from "./components/card";
import PrismaClient from "@/lib/prisma"
import {CustomerProps} from '../../../Util/customer.type'

export default async function Customer(){
    const session = await getServerSession(authOptions)
    console.log(session);
    if(!session || !session.user) {
     redirect('/')
    }  
        const customers = await PrismaClient.customer.findMany({
            where:{
                userId: session.user.id
            }
        })
        console.log(customers);

    return(
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Meus Clientes</h1>
                    <Link href="/dashboard/customer/new" className="bg-blue-500 text-white p-1 rounded-md">
                    Novo cliente
                    </Link>
                </div>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                    {customers.map((item)=>( 
                        <CardCustomer key={item.id} item={item}/>
                    ))}
                   
                </section>
                {customers.length === 0 && (
                    <h1 className="text-gray-500">Voce nao tem nenhum cliente cadastrado</h1>
                )}
            </main>
        </Container>
    )
}