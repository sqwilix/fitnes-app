import { useNavigate } from "react-router-dom"


export default function MainBanner() {
    const navigate = useNavigate()

    return(
        <div className="flex flex-col items-center justify-center">
            <div className="w-fit bg-transparent border border-gray-600 px-3 py-1 rounded-full text-sm mb-7">
                <span className="text-gray-400">Платформа нового поколения для персональных тренеров</span>
            </div>

            <div className="w-2xl leading-relaxed text-center">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
                    Тренируйте <span className="text-[#00f0af]">умнее</span>,
                    а не больше.
                </h1>
            </div>

            <div className="w-[640px] leading-relaxed text-center mt-7">
                <p className="text-gray-500 text-xl">
                    Планируйте тренировки клиентов, фиксируйте каждый подход, отслеживайте динамику силы. Всё в одном месте.
                </p>
            </div>

            <div className="flex items-center gap-3 mt-7">
                <button 
                    type="button"
                    onClick={() => navigate("/auth?mode=register&role=trainer")}
                    className="py-2 px-7 rounded-xl bg-[#00f0af] hover:bg-[#00f0af]/90 transition-all duration-200 text-black"
                >   
                    Я тренер
                </button>

                <button 
                    type="button"
                    onClick={() => navigate("/auth?mode=register&role=client")}
                    className="py-2 px-7 rounded-xl bg-[#001518] hover:bg-[#00f0af]/50 border border-gray-800 transition-all duration-200"
                >   
                    Я клиент
                </button>
            </div>
        </div>
    )
}