import { useEffect, useState } from "react"
import { getWorkouts } from "../../Services/Workout_Service"
import { Calendar } from "lucide-react"


export default function HomeClient() {
    const [workouts, setWorkouts] = useState([])
    const formattedDate = new Date().toLocaleDateString("ru-RU", {weekday: "long", day: "numeric", month: "long"})

    const fetchWorkouts = async () => {
        try {
            const data = await getWorkouts()

            if(data) {
                setWorkouts(data)
            }
        }catch(err: any) {
            console.error("Ошибка при получении тренировок:", err.response?.data?.message || err.message);
        }
    }

    useEffect(() => {
        fetchWorkouts()
    }, [])

    // console.log(workouts);

    return(
        <div className="w-full md:w-[50%] lg:w-[35%] flex flex-col items-start justify-center mx-auto mt-7">
            <p className="text-[#758d87]">{formattedDate}</p>
            <h1 className="text-3xl font-bold my-2">Сегодня</h1>

            {workouts.length === 0 ? (
                <div className="bg-[#001e20] border border-dashed border-[#00f0af]/10 w-full p-5 py-10 rounded-xl flex flex-col items-center justify-center mt-4">
                    <span className="text-white/30">
                        <Calendar size={40}/>
                    </span>
                    <p className="mt-2 text-[#758d87]">Сегодня тренировок нет</p>
                </div>
            ) : (
                <div className="">
                    test
                </div>
            )}
        </div>
    )
}