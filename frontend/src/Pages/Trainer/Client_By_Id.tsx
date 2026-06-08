import { useNavigate, useParams } from "react-router-dom"
import { getUserById } from "../../Services/User_Service"
import { useEffect, useState } from "react"
import type { IClientProfile } from "../../Types/types"
import { ArrowLeft, Calendar, Crown, TrendingUp } from "lucide-react"
import { createWorkout, getWorkouts, type ICreateWorkoutRequest } from "../../Services/Workout_Service"
import TrainingTab, { type Exercise } from "../../Components/Trainer/Tabs/Training_Tab"

type Tabs = "trainings" | "subscription" | "analytics"

export default function ClientById() {
    const getToday = () => new Date().toISOString().split('T')[0]

    const [user, setUser] = useState<IClientProfile | null>(null)
    const [tabs, setTabs] = useState<Tabs>("trainings")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [workouts, setWorkouts] = useState([])
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [title, setTitle] = useState<string>("")
    const [date, setDate] = useState<string>(getToday())
    const {clientId} = useParams()
    const navigate = useNavigate()


    const fetchWorkouts = async () => {
        const profileId = user?.clientProfile?.id;
        console.log("Пытаюсь отправить запрос с ID:", profileId);

        if (!profileId) return;

        try {
            const response = await getWorkouts(profileId);
            console.log("Успешный ответ от getWorkouts:", response);
            if (response.success) {
                setWorkouts(response.data); 
            }
        } catch(err: any) {
            // ОЧЕНЬ ВАЖНО: посмотри, что здесь выведется
            console.error("КРИТИЧЕСКАЯ ОШИБКА В ЗАПРОСЕ:", err);
            if (err.response) {
                console.error("Данные ошибки:", err.response.data);
                console.error("Статус ошибки:", err.response.status);
            }
        }
    }

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

    const handleCreateWorkout = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const workoutData: ICreateWorkoutRequest = {
            clientId: clientId!,
            date: date,
            title: title,
            exercises: exercises.map((ex, index) => ({
                name: ex.name,
                sets: ex.sets,
                reps: ex.reps,
                weight: ex.weight,
                order: index
            }))
        };

        try {
            await createWorkout(workoutData);
            setIsOpen(false);
            fetchWorkouts();
        } catch (err) {
            console.error("Ошибка при создании:", err);
        }
    };

    useEffect(() => {
        fetchUserById()
        fetchWorkouts()
    }, [])

    useEffect(() => {
        console.log("--- ЭФФЕКТ ЗАПУЩЕН ---");
        console.log("User:", user);
        console.log("User Profile ID:", user?.clientProfile?.id);
        
        if (user && user.clientProfile?.id) {
            console.log("Условия выполнены! Сейчас вызову fetchWorkouts...");
            fetchWorkouts();
        } else {
            console.log("Условия НЕ выполнены (нет user или нет id).");
        }
    }, [user]);

    console.log(workouts);
    
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
                    <p className="text-gray-400">
                        {
                            (user?.clientProfile.subscriptions?.length ?? 0) > 0
                                ? (() => {
                                    const sub = user!.clientProfile.subscriptions![0];
                                    return (sub.status === "EXPIRED" || sub.totalLessons === 0)
                                        ? "Нет активного абонемента" 
                                        : <span>
                                            Абонимент: 
                                            <span className="mx-1.5 text-[#00f0af]">{sub.title}</span>
                                            · {sub.remainingLesson}/{sub.totalLessons}
                                        </span>
                                        // : `Абонемент: ${sub.title} · ${sub.totalLessons}/${sub.remainingLesson}`;
                                })()
                                : "Нет активного абонемента"
                        }
                    </p>
                </div>
            </div>

            <ul className="flex w-fit items-center gap-3 bg-[#10282a] p-1 rounded-xl mt-5">
                <li
                    onClick={() => setTabs("trainings")}
                    className={`flex items-center py-0.5 px-2 rounded-xl transition-all duration-200 ${tabs === "trainings" ? "bg-[#00161a]" : "text-gray-400"}`}
                >
                    <Calendar size={18}/>
                    Тренировки
                </li>

                <li
                    onClick={() => setTabs("subscription")}
                    className={`flex items-center py-0.5 px-2 rounded-xl transition-all duration-200 ${tabs === "subscription" ? "bg-[#00161a]" : "text-gray-400"}`}
                >
                    <Crown size={18}/>
                    Абонименты
                </li>
                
                <li
                    onClick={() => setTabs("analytics")}
                    className={`flex items-center py-0.5 px-2 rounded-xl transition-all duration-200 ${tabs === "analytics" ? "bg-[#00161a]" : "text-gray-400"}`}
                >
                    <TrendingUp size={18}/>
                    Аналитика
                </li>
            </ul>

            {tabs === "trainings" && (
                <TrainingTab 
                    workouts={workouts}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    title={title}
                    setTitle={setTitle}
                    date={date}
                    setDate={setDate}
                    exercises={exercises}
                    setExercises={setExercises}
                    onSubmit={handleCreateWorkout}
                />
            )}

            {tabs === "subscription" && (
                <h1>Sub</h1>
            )}

            {tabs === "analytics" && (
                <h1>Analytics</h1>
            )}
        </div>
    )
}