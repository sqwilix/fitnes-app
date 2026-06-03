import { useNavigate, useSearchParams } from "react-router-dom";
import LeftPanel from "../Components/Auth/Left_Panel";
import React, { useState } from "react";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import { login, register } from "../Services/Auth_Service";


export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const isRegister = searchParams.get("mode") === "register"

    const role = searchParams.get("role") || "client"
    const mode = searchParams.get("mode") || "login"

    const setRole = (newRole: "trainer" | "client") => {
        setSearchParams({mode: "register", role: newRole})
    }

    const setMode = (newMode: string) => {
        if (newMode === 'login') {
            setSearchParams({ mode: 'login' });
        } else {
            setSearchParams({ mode: 'register', role: role || 'client' });
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const data = await register(firstName, lastName, email, password, role.toUpperCase())

            if(data.user?.role?.toLowerCase() === "trainer") {
                navigate('/trainer')
            }else {
                navigate('/client')
            }
        }catch(err: any) {
            console.error("Ошибка регистрации:", err.response?.data?.message || err.message);
        }
    }
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const data = await login(email, password)

            if(data.user?.role?.toLowerCase() === "trainer") {
                navigate('/trainer')
            }else {
                navigate('/client')
            }
        }catch(err: any) {
            console.error("Ошибка входа:", err.response?.data?.message || err.message);
        }
    }

    return(
        <div className="flex flex-1 w-full px-10 items-center justify-between h-[calc(100vh-80px)]">
            <LeftPanel/>

            <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="flex gap-2 mb-8 bg-[#10282a] p-1 rounded-xl border border-gray-800 w-full items-center justify-center">
                    <button
                        onClick={() => setMode("login")}
                        className={`py-0.5 rounded-lg flex-1 transition-all ${mode === "login" ? "bg-[#001518] text-white" : "text-gray-400"}`}
                    >
                        Вход
                    </button>
                    <button
                        onClick={() => setMode("register")}
                        className={`py-0.5 rounded-lg flex-1 transition-all ${mode === "register" ? "bg-[#001518] text-white" : "text-gray-400"}`}
                    >
                        Регистрация
                    </button>
                </div>
                
                {isRegister && (
                    <>
                        <p className="text-start flex items-start justify-start w-full mb-1.5">Я регистрируюсь как</p>
                        <div className="w-full flex gap-4 mb-8">
                            <button
                                onClick={() => setRole("trainer")}
                                className={`flex-1 text-[17px] font-medium py-4 px-6 rounded-2xl transition-all flex flex-col items-start ${
                                    role === "trainer" 
                                    ? "bg-[#002a28] border border-[#00f0af]" 
                                    : "bg-[#012022] border border-gray-800"
                                }`}
                            >
                                Я тренер
                                <span className="text-sm text-gray-500 mt-1.5 font-normal">Веду клиентов</span>
                            </button>
                            <button
                                onClick={() => setRole("client")}
                                className={`flex-1 text-[17px] font-medium py-4 px-6 rounded-2xl transition-all flex flex-col items-start ${
                                    role === "client" 
                                    ? "bg-[#002a28] border border-[#00f0af]" 
                                    : "bg-[#012022] border border-gray-800"
                                }`}
                            >
                                Я клиент
                                <span className="text-sm text-gray-500 mt-1.5 font-normal">Тренируюсь</span>
                            </button>
                        </div>
                    </>
                )}

                {mode === "login"
                    ? <Login
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        onSubmit={handleLogin}
                    />
                    : <Register
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        onSubmit={handleRegister}
                    />
                }
            </div>
        </div>
    )
}