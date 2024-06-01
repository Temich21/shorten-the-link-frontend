"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppSelector } from "@app/redux/store"
import { useGetLinksQuery, useDeleteLinkMutation } from '@app/redux/services/LinkServices'
import LoadingComponent from "@app/components/Loading/LoadingComponent"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Links() {
    const router = useRouter()
    const { isAuthenticated } = useAppSelector(state => state.authReducer)
    const { data: links, isLoading } = useGetLinksQuery()
    const [deleteLink] = useDeleteLinkMutation()

    const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    try {
        await deleteLink(id).unwrap()
        toast.success("Link was deleted")
    } catch (error) {
        toast.error("Failed to delete the link")
    }
};

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated, router])


    if (isLoading) {
        return <LoadingComponent />
    }

    if (links.length === 0) {
        return <div className="flex justify-center pt-3 text-xl">There isn't links</div>
    }

    return (
        <main className="flex justify-center">
            <table className="table-auto">
                <thead className="border-b-2 h-10">
                    <tr>
                        <th className="w-10 text-start">№</th>
                        <th className="w-96 text-start">Original link</th>
                        <th className="w-96 text-start">Shorter version</th>
                        <th className="w-16 text-start">Open</th>
                    </tr>
                </thead>
                <tbody>
                    {links.map((link, index) => {
                        return (
                            <tr key={link._id} className="border-b-2 h-10 text-sm">
                                <td>{index + 1}</td>
                                <td>{link.from}</td>
                                <td>{link.to}</td>
                                <td className="h-10 flex justify-between items-center">
                                    <Link className='text-blue-700' href={`/detail/${link._id}`}>Open</Link>
                                    <button onClick={(e) => handleDelete(e, link._id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <ToastContainer />
        </main>
    )
} 