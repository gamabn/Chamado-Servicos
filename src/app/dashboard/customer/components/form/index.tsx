"use client"

import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Input } from '../input' 
import { api } from '@/lib/api'
import {useRouter} from 'next/navigation'

const schema = z.object({
    name: z.string().min(1, "O campo é obrigatório"),
    email: z
      .string()
      .email("Digite um email válido.")
      .min(1, "O email é obrigatório"),
    phone: z
      .string()
      .refine(
        (value) =>
          /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || // (DD) 999999999
          /^\d{2}\s\d{9}$/.test(value) || // DD 999999999
          /^\d{11}$/.test(value), // 11999999999
        {
          message: "O número de telefone deve estar no formato (DD) 999999999 ou similar.",
        }
      ),
    address: z.string().min(1, "O endereço é obrigatório"),
  });

type FormData = z.infer<typeof schema>

export function NewCustomerForm({userId}: {userId: string}){
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver :  zodResolver(schema)
    })

    const router = useRouter();

  async function handleRegister(data:FormData){
      const response = await api.post('/api/customer',{
       name: data.name ,
       phone: data.phone,
       email: data.email,
       address: data.address,
       userId: userId
   })
      //console.log(response.data)
      router.replace("/dashboard/customer")
    }
    //const session = await getServerSession(authOptions)
    return(
        <form className="flex flex-col mt-6 " onSubmit={handleSubmit(handleRegister)}>
            <label className="mb-1 text-lg font-medium" htmlFor="">Nome Completo</label>
             <Input
             type='text'
             name='name'
             placeholder='Digite o nome completo'
             error={errors.name?.message}
             register={register}
            />

          <section className='flex gap-2 my-2 flex-col sm:flex-row'>
            <div className='flex-1'>
            <label className="mb-1 text-lg font-medium" htmlFor="">Telefone</label>   
            <Input
             type='number'
             name='phone'
             placeholder='Exemplo (DD) 999999696'
             error={errors.phone?.message}
             register={register}
           />
            </div>

            <div className='flex-1'>
            <label className="mb-1 text-lg font-medium" htmlFor="">Email</label>   
            <Input
             type='email'
             name='email'
             placeholder='Digite seu email...'
             error={errors.email?.message}
             register={register}
           />
            </div>
            </section>

            <label className="mb-1 text-lg font-medium" htmlFor="">Endereço</label>   
            <Input
             type='text'
             name='address'
             placeholder='Digite seu endereço do cliente...'
             error={errors.address?.message}
             register={register}
           />

           <button
           type='submit'
           className='bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold'
           >
            Cadastrar
           </button>
        </form>
    )
}