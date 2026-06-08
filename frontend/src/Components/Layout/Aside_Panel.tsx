import { Dumbbell, LogOut, Shield, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProfile } from "../../Services/User_Service";
import type { IUser } from "../../Types/types";


export default function AsidePanel() {
    const [user, setUser] = useState<IUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()

    const fetchUser = async () => {
        setIsLoading(true)

        try {
            const data = await getProfile()

            if(data) {
                setUser(data)
            }
        }catch(err: any) {
            console.error("Ошибка при получении данных профиля:", err.response?.data?.message || err.message);
        }finally {
            setIsLoading(false)
        }
    }

    
    useEffect(() => {
        fetchUser()
    }, [])

    if(isLoading) {
        <aside className="bg-[#001e20] p-5">Загрузка</aside>
    } 

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("accessToken")
        navigate('/auth')
    }

    const renderLinks = () => {
        if(user?.role === "ADMIN") {
            return(
                <>
                    <div 
                        className={`flex gap-3 cursor-pointer w-full p-2 rounded-xl transition-all duration-200 mb-3 ${location.pathname === '/admin' ? "bg-[#fff]/20" : "hover:bg-[#fff]/10"}`}
                        onClick={() => navigate('/admin')} 
                    >
                        <span>
                            <Users/>
                        </span>
                        <span>Клиенты</span>
                    </div>
                </>
            )
        }else {
            return(
                <>
                    <div 
                        className={`flex gap-3 cursor-pointer w-full p-2 rounded-xl transition-all duration-200 mb-3 ${location.pathname === '/trainer' ? "bg-[#fff]/20" : "hover:bg-[#fff]/10"}`}
                        onClick={() => navigate('/trainer')} 
                    >
                        <span>
                            <Users/>
                        </span>
                        <span>Клиенты</span>
                    </div>

                    <div 
                        className={`flex gap-3 cursor-pointer w-full p-2 rounded-xl transition-all duration-200 ${location.pathname === '/trainer/profile' ? "bg-[#fff]/20" : "hover:bg-[#fff]/10"}`}
                        onClick={() => navigate('/trainer/profile')}    
                    >
                        <span>
                            <User/>
                        </span>
                        <span>Профиль</span>
                    </div>
                </>
            )
        }
    }

    const renderHeader = () => {
        if(user?.role === "ADMIN") {
            return(
                <div className="flex items-center gap-3 mb-12">
                    <span
                        className='bg-[#00f0af] p-2 rounded-full text-black'
                    >
                        <Shield size={22}/>
                    </span>
                    <h2 className='text-xl font-bold'>Admin</h2>
                </div>
            )
        }else {
            return(
                <div className="flex items-center gap-3 mb-12">
                    <span
                        className='bg-[#00f0af] p-2 rounded-full text-black'
                    >
                        <Dumbbell size={22}/>
                    </span>
                    <h2 className='text-xl font-bold'>Smart Coaching</h2>
                </div>
            )
        }
    }
    
    return(
        <aside className="bg-[#001e20] flex flex-col items-start border border-[#001e20] h-full p-5">
            {renderHeader()}

            {renderLinks()}

            <div className="flex flex-col mt-auto items-start justify-start text-start border-t border-white/10 w-full">
                <p className="mt-5 text-sm text-white/50">{user?.email}</p>
                <button
                    type="button"
                    onClick={logout}
                    className="w-full hover:bg-[#00f0af]/50 transition-all duration-200 p-2 flex items-center gap-3 mt-5 rounded-xl"
                >
                    <LogOut size={18}/>
                    Выйти
                </button>
            </div>
        </aside>
    )
}