import { Container } from "@/components/container";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import {getServerSession} from 'next-auth'
import {redirect} from 'next/navigation'
import { NewCustomerForm } from "../components/form";


export default async function NewCustomer(){
    const session = await getServerSession(authOptions)
    console.log(session);
    if(!session || !session.user) {
     redirect('/')
    }

    return(
        <Container>
           <main className="flex flex-col mt-9 mb-2">
            <div className="flex items-center gap-3">
                <Link className="bg-black text-white rounded px-4 text-center py-1" href="/dashboard/customer">
                Voltar
                </Link>
                <h1>Novo Cliente</h1>
            </div>
                <NewCustomerForm userId={session.user.id}/>

           </main>
        </Container>
    )
}