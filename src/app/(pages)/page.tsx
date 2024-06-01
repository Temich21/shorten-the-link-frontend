"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from "@app/redux/store"
import AuthForm from "@app/components/AuthForm/AuthForm"
import { useAuth } from '@app/hooks/Auth.hook'

export default function Home() {
  useAuth()
  const router = useRouter()
  const { isAuthenticated } = useAppSelector(state => state.authReducer)

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/create')
    }
  }, [isAuthenticated, router])

  return (
    <AuthForm />
  )
}
