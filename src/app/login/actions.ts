'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


export async function login(formData: FormData) {
  const supabase = createServerActionClient({ cookies })

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log('Login error:', error.message)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

// export async function logout() {
//   const cookieStore = cookies()
//   const supabase = createServerActionClient({ cookies: () => cookieStore })

//   const { error } = await supabase.auth.signOut()

//   if (error) {
//     console.error('Logout error:', error.message)
//     redirect('/error')
//   }

//   revalidatePath('/', 'layout')
//   redirect('/login')
// }

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    // name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  console.log("data", data)

  // insert into user
  // const createUser = await prisma.user.create({
  //   data: {
  //     name: data.name,
  //     email: data.email,
  //     password: data.password,
  //   },
  // })
  // if (!createUser) {
  //   redirect('/error')
  // }

  const { error } = await supabase.auth.signUp(data)

  console.log("error", error)
  
  if (error) {
    console.log("error cok")
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}