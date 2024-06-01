"use client"
import Link from "next/link"
import { useAppSelector } from "@app/redux/store"

export default function Header() {
    const { logout } = useAppSelector(state => state.authReducer)

    const handleLogout = () => logout()
    return (
        <header className="flex justify-between items-center p-4 bg-blue-500 text-white">
            <div className="text-3xl">
                Links shortening
            </div>
            <ul className="flex gap-7 pr-8">
                <li>
                    <Link href={'/create'}>Create</Link>
                </li>
                <li>
                    <Link href={'/links'}>Links</Link>
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </header>
    )
}