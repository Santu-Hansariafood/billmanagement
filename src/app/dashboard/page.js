"use client"
import Dashboard from '@/components/pages/Dashboard/Dashboard'
import React from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

const Page = () => {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/', redirect: true })
  }

  return (
    <Dashboard onLogout={handleLogout} />
  )
}

export default Page
