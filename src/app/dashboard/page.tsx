import {Container} from '@/components/container'
import { getServerSession } from 'next-auth'
import { authOptions} from '@/lib/auth'
import {  redirect} from 'next/navigation'
import Link from 'next/link'
import {TicketItem} from '@/app/dashboard/components/ticket'

export default async function Dashboard(){
    const session = await getServerSession(authOptions)
     console.log(session);
     if(!session || !session.user) {
      redirect('/')
     }
     
    return(
        <Container>
          <main className='mt-9 mb-9'>
            <div className='flex items-center justify-between'>
                  <h1 className='text-3xl font-bold'>Chamados</h1>
                <Link href="/dashboard/new" className='bg-blue-500 px-4 py-1 rounded text-white'>
                Abrir chamados
                </Link>
             </div>

             <table className='min-w-full my-2'>
                <thead>
                    <tr>
                        <th className='font-medium text-left pl-1'>Cliente</th>
                        <th className='font-medium text-left  hidden sm:table-cell'>Data Cadastro</th>
                        <th className='font-medium text-left'>Status</th>
                        <th className='font-medium text-left'>#</th>
                    </tr>
                </thead>
                <tbody>
                  <TicketItem/>
                
                </tbody>
             </table>
          </main>
        
        
        </Container>
        
    )
}