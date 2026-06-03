

export default function LeftPanel() {
    return(
        <div className="h-full flex flex-col py-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold flex flex-col">
                Один инструмент
                <span className="text-[#00f0af]">для тренера и клиента.</span>
            </h1>

            <p className="text-gray-400 flex flex-col mt-5">
                План тренировок, интерактивный трекер подходов,
                <span>история и аналитика — всё под одной крышей.</span>
            </p>

            <span className="mt-auto pt-10 text-gray-500">
                © {new Date().getFullYear()} Smart Coaching
            </span>
        </div>
    )
}