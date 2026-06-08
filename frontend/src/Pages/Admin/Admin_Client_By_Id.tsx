import { useNavigate, useParams } from "react-router-dom"
import { getUserById } from "../../Services/User_Service"
import React, { useEffect, useState } from "react"
import type { IClientProfile } from "../../Types/types"
import { ArrowLeft, Crown, Plus, Trash2, X } from "lucide-react"
import { createSubscription, deleteSubscription, updateSubscription } from "../../Services/Subscription_Service"


export default function AdminClientById() {
    const getNextMonthDate = () => {
        const d = new Date()
        d.setMonth(d.getMonth() + 1)
        return d.toISOString().split('T')[0]
    }

    const [user, setUser] = useState<IClientProfile | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [totalLessons, setTotalLessons] = useState<number>(8)
    const [date, setDate] = useState<string>(getNextMonthDate())
    const {clientId} = useParams()
    const navigate = useNavigate()

    const fetchUserById = async () => {
        try {
            const data = await getUserById(clientId as string)

            if(data) {
                setUser(data)
            }
        }catch(err: any) {
            console.error("Ошибка при получении данных о клиенте по айди:", err.response?.data?.message || err.message);
        }
    }

    const handleAddSub = async (e: React.FormEvent) => {
        e.preventDefault()

        const today = new Date()
        const selectedDate = new Date(date)
        const diffTime = selectedDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        try {
            await createSubscription(user?.clientProfile.id as string, title, totalLessons, diffDays)
            setIsOpen(false)
            fetchUserById()
        }catch(err: any) {
            console.error("Ошибка при создании:", err.response?.data?.message);
        }
    }

    const handleDelete = async (subscriptionId: string) => {
        try {
            const deleted = await deleteSubscription(subscriptionId)

            if(deleted) {
                fetchUserById()
            }
        }catch(err: any) {
            console.error("Ошибка при удалении абонемента:", err.response?.data?.message);
        }
    }
    
    const SubscriptionItem = ({sub, onUpdate}: {sub: any, onUpdate: () => void}) => {
        const [title, setTitle] = useState(sub.title)
        const [lessons, setLessons] = useState(sub.totalLessons)
        const [remainingLesson, setRemainingLesson] = useState(sub.remainingLesson)
        const [date, setDate] = useState(sub.endDate.split('T')[0])
        const [status, setStatus] = useState(sub.status)

        const handleUpdateSub = async (e: React.FormEvent) => {
            e.preventDefault()

            const today = new Date()
            const selectedDate = new Date(date)
            const diffTime = selectedDate.getTime() - today.getTime()
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
            try {
                const updated = await updateSubscription(
                    sub.id, 
                    title, 
                    lessons,
                    diffDays, 
                    Number(remainingLesson),
                    status
                )

                if(updated) {
                    fetchUserById()
                }else {
                    console.error("Ошибка: ");
                }
            }catch(err: any) {
                console.error("Ошибка: ", err.response?.data?.message);
            }
        }

        return(
            <div className="bg-[#001e20] p-4 rounded-xl border border-[#00f0af]/10 mb-4">

                <div className="flex gap-3 items-center">
                    <input 
                        className={inputStyle}
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    
                    <button
                        onClick={() => handleDelete(sub.id)}
                        type="button"
                        className="mb-3 text-red-500 p-2.5 rounded-xl hover:bg-[#00f0af]/35 transition-all duration-200"
                    >
                        <Trash2 size={18}/>
                    </button>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col">
                        <label className="text-[10px] text-gray-500 uppercase">Статус</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={inputStyle}
                        >
                            {["ACTIVE", "FROZEN", "EXPIRED"].map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[10px] text-gray-500 uppercase">Осталось</label>
                        <input type="number" className={inputStyle} value={remainingLesson} onChange={(e) => setRemainingLesson(e.target.value)}/>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[10px] text-gray-500 uppercase">Всего</label>
                        <input type="number" className={inputStyle} value={lessons} onChange={(e) => setLessons(Number(e.target.value))} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[10px] text-gray-500 uppercase">До</label>
                        <input type="date" className={inputStyle} value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <button onClick={handleUpdateSub} className="ml-auto text-[#00f0af] text-sm">Сохранить</button>
                </div>
            </div>
        )
    }

    useEffect(() => {
        fetchUserById()
    }, [])

    const inputStyle = "w-full mb-3 p-1.5 rounded-xl ring-2 ring-[#00f0af]/5 focus:ring-[#00f0af] outline-none transition-all duration-200"
    
    return(
        <div className="flex flex-col">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex gap-1.5 items-center mt-7 text-gray-400 hover:text-white transition-all duration-200"
            >
                <ArrowLeft/>
                Назад
            </button>

            <div className="flex gap-3 items-center mt-7">
                <div className="w-14 h-14 text-2xl bg-[#00f0af] rounded-full flex items-center justify-center text-black font-bold">
                    {user?.firstName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">{user?.firstName}</h1>
                </div>
            </div>

            <div className="w-full flex flex-col mt-10">
                <div className="flex items-center justify-between w-full">
                    <div className="flex gap-1.5 items-center">
                        <span className="text-[#00f0af]">
                            <Crown size={20}/>
                        </span>
                        <h6 className="text-xl font-medium">
                            Абонементы
                        </h6>
                    </div>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-[#00f0af] rounded-xl flex items-center gap-3 py-1.5 px-3 text-black"
                    >
                        <Plus size={18}/>
                        Выдать
                    </button>
                </div>

                <div className="mt-3">
                    {user?.clientProfile.subscriptions && user.clientProfile.subscriptions.length > 0 ? (
                        user.clientProfile.subscriptions.map((sub) => (
                            <SubscriptionItem
                                key={sub.id}
                                sub={sub}
                                onUpdate={fetchUserById}
                            />
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500 border-2 border-dashed border-white/10 rounded-xl">
                            Абонементов нет
                        </div>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="fixed z-50 bg-black/70 flex items-center justify-center w-full h-screen inset-0">
                    <form 
                        className="flex flex-col p-5 bg-[#001518] border border-[#00f0af]/10 w-[40%] rounded-xl"
                        onSubmit={handleAddSub}
                    >
                        <div className="w-full flex items-center justify-between">
                            <h3 className="font-medium text-[17px]">Новый абонемент</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                            >
                                <X size={18}/>
                            </button>
                        </div>
                        
                        <div className="flex flex-col">
                            <div className="flex flex-col">
                                <label>Название</label>
                                <input 
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={inputStyle}
                                    placeholder="8 занятий"
                                />
                            </div>

                            <div className="flex-row lg:flex items-center w-full gap-3">
                                <div className="flex flex-col flex-1">
                                    <label>Занятий</label>
                                    <input 
                                        type="number"
                                        value={totalLessons}
                                        onChange={(e) => setTotalLessons(Number(e.target.value))}
                                        className={inputStyle}
                                        placeholder="Сколько занятий"
                                    />
                                </div>

                                <div className="flex flex-col flex-1">
                                    <label>Действует до</label>
                                    <input 
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full items-end justify-end">
                            <button
                                type="submit"
                                className="bg-[#00f0af] rounded-xl flex items-center gap-3 py-1.5 px-3 text-black"
                            >
                                Создать
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}