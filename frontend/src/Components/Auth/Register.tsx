import type React from "react"

interface RegisterProps {
    firstName: string,
    setFirstName: (val: string) => void,
    lastName: string,
    setLastName: (val: string) => void,
    email: string,
    setEmail: (val: string) => void,
    password: string,
    setPassword: (val: string) => void,
    onSubmit: (e: React.FormEvent) => Promise<void>
}

export default function Register({firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, onSubmit}: RegisterProps) {
 
    const inputStyle = 'p-1.5 rounded-xl ring-2 ring-[#00f0af]/15 focus:ring-[#00f0af] outline-none transition-all duration-200'

    return(
        <form 
            className="w-full"
            onSubmit={onSubmit}
        >
            <div className="flex flex-col w-full mb-3">
                <label className="mb-2">Имя</label>
                <input 
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Алексей"
                    required
                    className={inputStyle}
                />
            </div>

            <div className="flex flex-col w-full mb-3">
                <label className="mb-2">Фамилия</label>
                <input 
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Петров"
                    required
                    className={inputStyle}
                />
            </div>

            <div className="flex flex-col w-full mb-3">
                <label className="mb-2">Email</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className={inputStyle}
                />
            </div>

            <div className="flex flex-col w-full mb-3">
                <label className="mb-2">Пароль</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={inputStyle}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-[#00f0af] p-2 rounded-xl text-black"
            >
                Создать аккаунт
            </button>
        </form>
    )
}