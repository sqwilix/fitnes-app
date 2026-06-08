import { useEffect, useState } from "react"
import type { IClientProfile } from "../../Types/types"
import { getAllClients } from "../../Services/Clients_Service"
import { ChevronRight, Search } from "lucide-react"
import { useNavigate } from "react-router-dom"


export default function HomeAdmin() {
    const [clients, setClients] = useState<IClientProfile[]>([])
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const fetchClients = async () => {
        try {
            const data = await getAllClients()

            if(data) {
                setClients(data)
            }
        }catch(err: any) {
            console.error("Ошибка при получении данных о клиентах:", err.response?.data?.message || err.message);
        }
    }

    const filteredClients = clients.filter((client: any) => 
        client.firstName.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        fetchClients()
    }, [])

    return(
        <div className="">
            <h1 className="text-3xl font-bold">Все клиенты</h1>
            <p className="text-[#758d87] text-[17px] mt-1 mb-5">Управление абонементами пользователей</p>

            <div className={`w-full mb-3 p-1.5 rounded-xl ring-2 ring-[#00f0af]/5 focus-within:ring-[#00f0af] outline-none transition-all duration-200 flex gap-3 items-center`}>
                <span className="text-gray-400">
                    <Search size={18}/>
                </span>
                <input 
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Поиск по именам..."
                    className="outline-none flex-1 bg-transparent"  
                />
            </div>

            <ul>
                {filteredClients.map((client) => (
                    <li
                        onClick={() => navigate(`/admin/client/${client.id}`)}
                        key={client.id}
                        className="p-5 bg-[#012022] border border-[#00f0af]/10 hover:border-[#00f0af]/35 rounded-xl mb-3 flex items-center justify-between transition-all duration-200"
                    >
                        <div className="flex gap-3 items-center">
                            <span className="bg-[#00f0af] w-14 h-14 rounded-full flex items-center justify-center text-black font-bold">
                                {client.firstName.charAt(0).toUpperCase()}
                            </span>

                            <div className="flex flex-col">
                                <h5 className="font-medium mb-1">{client.firstName}</h5>
                                <p>
                                    {
                                        (client.clientProfile.subscriptions?.length ?? 0) > 0
                                            ? (() => {
                                                const sub = client.clientProfile.subscriptions![0];
                                                return (sub.status === "EXPIRED" || sub.totalLessons === 0)
                                                    ? "Нет активного абонемента" 
                                                    : <div className="flex">
                                                        <span className="bg-[#003537] text-white/50 rounded-[6px] px-1.5">{sub.totalLessons} занятий</span>
                                                        <span className="ml-2 text-[#00f0af]">{sub.remainingLesson}/{sub.totalLessons}</span>
                                                    </div>
                                            })()
                                            : <span className="text-sm text-[#758d87]">Нет активного абонемента</span>
                                    }
                                </p>
                            </div>
                        </div>

                        <button className="text-gray-500">
                            <ChevronRight size={20}/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}