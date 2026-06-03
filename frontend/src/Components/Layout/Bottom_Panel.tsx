import { Calendar, History, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";


export default function BottomPanel() {
    const location = useLocation()
    const navigate = useNavigate()

    return(
        <div className="w-full mt-auto bg-[#001e20] flex items-center justify-center gap-5 border border-[#001e20]/10">
            <div 
                className={`flex flex-col text-center items-center p-3 transition-all duration-200 ${location.pathname === '/client' ? "text-[#00f0af]" : ""}`}
                onClick={() => navigate('/client')}
            >
                <span className="mb-1">
                    <Calendar size={20}/>
                </span>
                <p>Календарь</p>
            </div>

            <div 
                className={`flex flex-col text-center items-center p-3 transition-all duration-200 ${location.pathname === '/client/history' ? "text-[#00f0af]" : ""}`}
                onClick={() => navigate('/client/history')}
            >
                <span className="mb-1">
                    <History size={20}/>
                </span>
                <p>История</p>
            </div>

            <div 
                className={`flex flex-col text-center items-center p-3 transition-all duration-200 ${location.pathname === '/client/profile' ? "text-[#00f0af]" : ""}`}
                onClick={() => navigate('/client/profile')}
            >
                <span className="mb-1">
                    <User size={20}/>
                </span>
                <p>Профиль</p>
            </div>
        </div>
    )
}