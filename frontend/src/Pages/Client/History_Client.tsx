import { useEffect, useState } from "react"
import { getWorkouts } from "../../Services/Workout_Service"


export default function HistoryClient() {
    const [workouts, setWorkouts] = useState([])

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
    
    return(
        <div className="w-full md:w-[50%] lg:w-[35%] flex flex-col items-start justify-center mx-auto mt-7">
            <h1 className="text-3xl font-bold my-2">Прогресс</h1>

            {workouts.length === 0 ? (
                <div className="bg-[#001e20] border border-dashed border-[#00f0af]/10 w-full p-5 py-10 rounded-xl flex flex-col items-center justify-center mt-4">
                    <p className="mt-2 text-[#758d87] text-center text-[17px] leading-relaxed">
                        Пока нет данных — закончите тренировку, чтобы увидеть прогресс
                    </p>
                </div>
            ) : (
                <div className="">
                    test
                </div>
            )}
        </div>
    )
}