import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getFreeClients, getMyClients } from "../../Services/Clients_Service";


export default function HomeTrainer() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [myClients, setMyClients] = useState([])
    const [freeClients, setFreeClients] = useState([])
    const [search, setSearch] = useState<string>("")

    const fetchMyClients = async () => {
        try {
            const data = await getMyClients()

            if(data) {
                setMyClients(data)
            }
        }catch(err: any) {
            console.error("Ошибка при получении данных о моих клиентах:", err.response?.data?.message || err.message);
        }
    }
    
    const fetchFreeClients = async () => {
        try {
            const data = await getFreeClients()

            if(data) {
                setFreeClients(data)
            }
        }catch(err: any) {
            console.error("Ошибка при получении данных о свободных клиентах:", err.response?.data?.message || err.message);
        }
    }

    const filteredClients = freeClients.filter((client: any) => 
        client.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        client.lastName?.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        fetchMyClients()
        fetchFreeClients()
    }, [])

    console.log(freeClients);
    
    return(
        <div className="">
            <div className="flex w-full items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">Клиенты</h1>
                    <p className="text-[#758d87]">Управление подопечными и абонементами</p>
                </div>

                <button 
                    className="bg-[#00f0af] hover:bg-[#00f0af]/90 transition-all duration-200 text-black flex items-center justify-center gap-3 p-1.5 rounded-xl"
                    onClick={() => setIsOpen(true)}    
                >
                    <Plus/>
                    Добавить
                </button>
            </div>

            {myClients.length === 0 ? (
                <div className="bg-[#012022] border border-[#00f0af]/10 p-5 py-10 rounded-xl mt-7 flex items-center justify-center">
                    Клиенты пока что не добавлены
                </div>
            ) : (
                <div className=""></div>
            )}

            {isOpen && (
                <div className="fixed z-50 bg-black/70 flex items-center justify-center w-full h-screen inset-0">
                    <div className="flex flex-col p-5 bg-[#001518] border border-[#00f0af]/10 w-[40%] rounded-xl">
                        <div className="w-full flex items-center justify-between">
                            <h3 className="font-medium text-[17px] mb-5">Новый клиент</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                            >
                                <X/>
                            </button>
                        </div>
                        
                        <div className="flex flex-col">
                            <label>Поиск по имени</label>
                            <input 
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Начинайте вводить или просто листайте список..."
                                className="p-1.5 rounded-xl ring-2 ring-[#00f0af]/5 focus:ring-[#00f0af] outline-none transition-all duration-200 placeholder:text-sm"    
                            />
                        </div>

                        <ul className="mt-5">
                            {filteredClients.length === 0 ? (
                                <div className="bg-[#001518] border border-[#00f0af]/10 p-3 rounded-xl text-center text-[#758d87]">
                                    <p>Нет свободных клиентов</p>
                                </div>
                            ) : (
                                filteredClients.map((client: any) => (
                                    <li key={client.id} className="flex justify-between items-center p-3 bg-[#012022] rounded-lg border border-[#00f0af]/10">
                                        <span>{client.firstName} {client.lastName}</span>
                                        <button 
                                            onClick={() => console.log("Назначить", client.id)}
                                            className="bg-[#00f0af] text-black px-3 py-1 rounded-md text-sm font-medium"
                                        >
                                            Выбрать
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>

                        <p className="text-sm text-[#758d87] mt-2">Видны только клиенты, не привязанные к другому тренеру.</p>
                    </div>
                </div>
            )}
        </div>
    )
}