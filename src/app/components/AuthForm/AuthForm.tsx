"use client"

import PasswordVisiblity from '@app/components/PasswordVisibility/PasswordVisibilty'
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppSelector } from "@app/redux/store"
import { useGetUserMutation, useCreateUserMutation, User } from '@app/redux/services/AuthServices'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AuthForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>()

    const { eye } = useAppSelector(state => state.eyeReducer)
    const { login } = useAppSelector(state => state.authReducer)

    const [getUser] = useGetUserMutation()
    const [createUser] = useCreateUserMutation()

    const handleLogin: SubmitHandler<User> = async (data) => {
        try {
            const response = await createUser(data).unwrap()
            login(response)
            toast.success("Login successful")
        } catch (e) {
            if (e.data.errors.length) {
                const arrayWithErrors = e.data.errors
                for (let i = 0; i < arrayWithErrors.length; i++) {
                    toast.error(arrayWithErrors[i]['msg'])
                }
            } else {
                toast.error("Login failed")
            }
        }
    }

    const handleRegistration: SubmitHandler<User> = async (data) => {
        try {
            await getUser(data).unwrap();
            toast.success("Registration successful")
        } catch (e) {
            if (e.data.errors.length) {
                const arrayWithErrors = e.data.errors
                for (let i = 0; i < arrayWithErrors.length; i++) {
                    toast.error(arrayWithErrors[i]['msg'])
                }
            } else {
                toast.error("Registration failed")
            }
        }
    }

    return (
        <main className="flex flex-col items-center">
            <header className="text-5xl mt-7 mb-5">Short link</header>
            <form className="flex flex-col gap-3 p-5 text-white bg-blue-500 rounded-sm">
                <div>Authorization</div>
                <div className="flex flex-col border-b-2">
                    <label className="text-xs" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        className="w-96 bg-blue-500 placeholder-gray-300"
                        placeholder="Please enter email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span className='text-red-600'>This field is required</span>}
                </div>
                <div className="flex flex-col border-b-2 mb-2">
                    <label className="text-xs" htmlFor="password">Password</label>
                    <div>
                        <input
                            id="password"
                            type={eye ? "text" : "password"}
                            className="w-96 bg-blue-500 placeholder-gray-300"
                            placeholder="Please enter password"
                            {...register("password", { required: true })}
                        />
                        <PasswordVisiblity />
                    </div>
                    {errors.password && <span className='text-red-600'>This field is required</span>}
                </div>
                <div>
                    <button
                        onClick={handleSubmit(handleLogin)}
                        className="text-sm bg-[#F39C12] p-2 mr-4 rounded-lg"
                    >Log in</button>
                    <button
                        onClick={handleSubmit(handleRegistration)}
                        className="text-sm text-black bg-gray-400 p-2 mr-4 rounded-lg"
                    >Registration</button>
                </div>
            </form>
            <ToastContainer />
        </main>
    )
}
