
import React, { useRef, useState } from 'react'
import type { IUser } from '../types/user.types'


interface IProp {
    onAddUser: (user: IUser) => void
}


const UserForm = ({ onAddUser }: IProp) => {

    const [userName, setUserName] = useState<string>("")
    const [error, setError] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setUserName(value)
        if (value) {
            setError("")
        }
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(userName === "") {
            setError("Input empty error!")
            return
        }

        const newUser: IUser = {
            id: crypto.randomUUID(),
            name: userName,
            registeredAt: new Date()
        }

        try {
            onAddUser(newUser)
            if (inputRef.current) {
                inputRef.current.focus()
                inputRef.current.value = ""
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 group">
                    <input
                        ref={inputRef}
                        type="text"
                        value={userName}
                        onChange={(e) => handleInput(e)}
                        placeholder="Enter a name…"
                        className={`${error ? "border-red-500!" : ""} w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition-all duration-300 
                           focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:bg-slate-800/90
                           hover:border-slate-600 hover:bg-slate-800/80`}
                    />


                    {/* Subtle glow on focus */}
                    <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 bg-linear-to-r from-indigo-500/5 to-purple-500/5 blur-xl" />
                </div>

                <button
                    type="submit"
                    className="relative cursor-pointer overflow-hidden rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300
                         hover:shadow-indigo-500/40 hover:scale-[1.03] hover:from-indigo-400 hover:to-purple-500
                         active:scale-95 active:shadow-md
                         focus:outline-none focus:ring-4 focus:ring-indigo-400/30"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add User
                    </span>
                    {/* Shimmer overlay */}
                    <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
            </form>
            {error && <p className='text-red-500 px-3 my-2 font-bold'>Please fill the input!</p>}
        </>

    )
}

export default UserForm