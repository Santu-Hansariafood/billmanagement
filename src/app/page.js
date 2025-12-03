"use client"
import Login from '@/components/pages/Login/Login'
import React from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const Page = () => {
  const router = useRouter()

  const handleLogin = async ({ mobile, password }) => {
    const res = await signIn('credentials', { mobile, password, redirect: false })
    if (res?.ok) router.push('/dashboard')
  }

  return (
    <Login onLogin={handleLogin} />
  )
}

export default Page
