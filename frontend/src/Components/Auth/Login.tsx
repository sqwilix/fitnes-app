import type React from "react"


interface LoginProps {
    email: string,
    setEmail: (val: string) => void,
    password: string,
    setPassword: (val: string) => void,
    onSubmit: (e: React.FormEvent) => Promise<void>
}

export default function Login({email, setEmail, password, setPassword, onSubmit}: LoginProps) {
    return(
        <form 
            className="w-full"
            onSubmit={onSubmit}
        >
            <div className="flex flex-col w-full mb-3">
                <label className="mb-2">Email</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="p-1.5 rounded-xl ring-2 ring-[#00f0af]/5 focus:ring-[#00f0af] outline-none transition-all duration-200"
                />
            </div>

            <div className="flex flex-col w-full mb-3">
                <label className="mb-2">Пароль</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-1.5 rounded-xl ring-2 ring-[#00f0af]/5 focus:ring-[#00f0af] outline-none transition-all duration-200"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-[#00f0af] p-2 rounded-xl text-black"
            >
                Войти
            </button>
        </form>
    )
}