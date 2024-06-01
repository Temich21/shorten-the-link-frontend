"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from "@app/redux/store"
import { useCreateLinkMutation } from '@app/redux/services/LinkServices'

export default function Create() {
  const [link, setLink] = useState('')
  const router = useRouter()
  const { isAuthenticated } = useAppSelector(state => state.authReducer)
  const [createLink] = useCreateLinkMutation()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const pressHandler = async (event: { key: string }) => {
    if (event.key === 'Enter') {
      try {
        const response = await createLink({ from: link }).unwrap()
        router.push(`/detail/${response.link._id}`)
      } catch (error) {
        console.log('error ', error)
      }
    }
  }

  const handleCreate = async () => {
    try {
      const response = await createLink({ from: link }).unwrap()
      router.push(`/detail/${response.link._id}`)
    } catch (error) {
      console.log('error ', error)
    }
  }

  return (
    <main className="flex flex-col items-center">
      <div className="pt-5">
        <div className="text-sm text-gray-400 font-bold mb-3">Enter your link</div>
        <input
          type="text"
          className="w-200 border-b-2 mb-3"
          placeholder="Put your link here"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          onKeyDown={pressHandler}
        />
        <div>
          <button
            className='w-20 h-8 text-white bg-blue-500 rounded-lg'
            onClick={handleCreate}
          >Create</button>
        </div>
      </div>
    </main>
  )
}
