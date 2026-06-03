import React, { useEffect, useState } from "react"
import { getProfile, updateClientProfile } from "../../Services/User_Service"
import type { IUser } from "../../Types/types"
import { LogOut, Save } from "lucide-react"
import { useNavigate } from "react-router-dom"


export default function ProfileClient() {
    const [user, setUser] = useState<IUser | null>(null)
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [weight, setWeight] = useState<number | string>("")
    const [height, setHeight] = useState<number | string>("")
    const [goal, setGoal] = useState<string>("")
    const [subscription, setSubscription] = useState(null)
    const navigate = useNavigate()
    
    const fetchProfile = async () => {
        try {
            const data = await getProfile()

            if(data) {
                setUser(data)
            }
        }catch(err: any) {
            console.error("Ошибка при получении данных профиля:", err.response?.data?.message || err.message);
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    useEffect(() => {
        setFirstName(user?.firstName ?? "")
        setLastName(user?.lastName ?? "")
        setWeight(user?.clientProfile?.weight ?? "")
        setHeight(user?.clientProfile?.height ?? "")
        setGoal(user?.clientProfile?.goal ?? "")
    }, [user])

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const data = await updateClientProfile({
                firstName,
                lastName,
                weight: Number(weight),
                height: Number(height),
                goal
            })

            await fetchProfile()
        }catch(err: any) {
            console.error("Ошибка обновлении профиля:", err.response?.data?.message || err.message);
        }
    }

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("accessToken")
        navigate('/auth')
    }

    const inputStyle = "p-1.5 rounded-xl ring-2 ring-[#00f0af]/5 focus:ring-[#00f0af] outline-none transition-all duration-200"

    return(
        <div className="w-full md:w-[50%] lg:w-[35%] flex flex-col items-center justify-center mx-auto mt-7">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#00f0af] text-black text-2xl font-bold">
                {user?.firstName.charAt(0).toUpperCase() || "?"}
            </div>

            <h1 className="mt-5 text-2xl font-bold">{user?.firstName || "Без имени"}</h1>
            <p className="text-[#758d87]">{user?.email || "unknown@gmail.com"}</p>

            <div className="bg-[#001e20] border border-dashed border-[#00f0af]/10 w-full p-5 py-6 rounded-xl flex flex-col items-center justify-center mt-4">
                {!subscription ? (
                    <p className="text-[#758d87] text-sm text-center leading-relaxed">Активный абонемент отсутствует.</p>
                ) : (
                    <p>Test</p>
                )}
            </div>

            <form
                onSubmit={handleUpdate}
                className="bg-[#001e20] border border-[#00f0af]/10 w-full p-5 py-6 rounded-xl flex flex-col items-center justify-center mt-4"
            >
                <h3 className="text-start flex items-start justify-start w-full font-medium mb-5">Личные данные</h3>
                <div className="flex-row md:flex gap-3 w-full">
                    <div className="flex flex-col flex-1 mb-3">
                        <label className="mb-1.5">Имя</label>
                        <input 
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Ваше имя?"
                            className={inputStyle}
                        />
                    </div>

                    <div className="flex flex-col flex-1 mb-3">
                        <label className="mb-1.5">Фамилия</label>
                        <input 
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Ваша фамилия?"
                            className={inputStyle}
                        />
                    </div>
                </div>

                <div className="flex-row md:flex gap-3 w-full">
                    <div className="flex flex-col flex-1 mb-3">
                        <label className="mb-1.5">Вес, кг</label>
                        <input 
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Ваш вес?"    
                            className={inputStyle}
                        />
                    </div>

                    <div className="flex flex-col flex-1 mb-3">
                        <label className="mb-1.5">Рост, см</label>
                        <input 
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Ваш рост?"
                            className={inputStyle}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full mb-3">
                    <label className="mb-1.5">Цель</label>
                    <textarea
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="Например: похудеть на 5кг к лету"
                        className={inputStyle}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#00f0af] hover:bg-[#00f0af]/90 transition-all duration-200 text-black flex items-center justify-center gap-3 p-1.5 rounded-xl"
                >
                    <Save size={18}/>
                    Сохранить
                </button>
            </form>

            <button
                type="button"
                onClick={logout}
                className="w-full bg-[#001518] hover:bg-[#00f0af]/50 transition-all duration-200 border border-[#00f0af]/10 p-2 flex items-center justify-center gap-3 mt-5 rounded-xl"
            >
                <LogOut size={18}/>
                Выйти
            </button>
        </div>
    )
}