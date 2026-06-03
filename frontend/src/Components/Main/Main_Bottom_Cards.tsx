import { Calendar, Dumbbell, TrendingUp, Users } from "lucide-react"


export default function MainBottomCards() {
    const cards = [
        {
            icon: <Users/>,
            title: "Клиенты",
            desc: "Управляйте подопечными и подписками"
        },
        {
            icon: <Calendar/>,
            title: "Планировщик",
            desc: "Календарь тренировок и программ"
        },
        {
            icon: <Dumbbell/>,
            title: "Трекер",
            desc: "Пошаговый режим тренировки с таймером"
        },
        {
            icon: <TrendingUp/>,
            title: "Аналитика",
            desc: "Графики прогресса по упражнениям"
        }
    ]

    return(
        <div className="w-full px-14 mt-20">
            <ul className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
                {cards.map((card, index) => (
                    <li 
                        key={index}
                        className="bg-[#012022] border border-[#00f0af]/10 p-7 rounded-2xl"
                    >
                        <span className="text-[#00f0af]">
                            {card.icon}
                        </span>
                        <h4 className="mt-2 mb-1 font-bold">{card.title}</h4>
                        <p className="text-[15px] text-gray-400">{card.desc}</p>
                    </li>
                ))}
            </ul>

        </div>
    )
}