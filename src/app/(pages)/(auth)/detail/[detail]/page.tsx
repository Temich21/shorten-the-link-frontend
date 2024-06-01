"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from "@app/redux/store"
import { useGetLinkQuery } from '@app/redux/services/LinkServices'
import LinkCard from '@app/components/LinkCard/LinkCard'
import LoadingComponent from "@app/components/Loading/LoadingComponent"

export default function Detail({ params }: { params: { detail: string } }) {
  const router = useRouter()
  const { isAuthenticated } = useAppSelector(state => state.authReducer)
  const { data: link, isLoading } = useGetLinkQuery(params.detail)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <main>
        <LinkCard link={link}/>
    </main>
  )
} 