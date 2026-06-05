import { useEffect, useState } from "react"
import type { IUser } from "../../Types/types"
import { getProfile, updateTrainerProfile } from "../../Services/User_Service"
import { Save } from "lucide-react"


export default function ProfileTrainer() {
    const [trainer, setTrainer] = useState<IUser | null>(null)
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [specialization, setSpecialization] = useState<string>("")
    const [experience, setExperience] = useState<string | number>("")
    const [aboutMe, setAboutMe] = useState<string>("")

    const fetchTrainer = async () => {
        try {
            const data = await getProfile()

            if(data) {
                setTrainer(data)
            }
        }catch(err: any) {
            console.error("Ошибка при получении данных профиля:", err.response?.data?.message || err.message);
        }
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const data = await updateTrainerProfile({
                firstName,
                lastName,
                specialization,
                experience: Number(experience),
                aboutMe
            })

            await fetchTrainer()
        }catch(err: any) {
            console.error("Ошибка обновлении профиля:", err.response?.data?.message || err.message);
        }
    }

    useEffect(() => {
        fetchTrainer()
    }, [])

    useEffect(() => {
        setFirstName(trainer?.firstName || "")
        setLastName(trainer?.lastName || "")
        setSpecialization(trainer?.trainerProfile?.specialization || "")
        setExperience(trainer?.trainerProfile?.experience || 0)
        setAboutMe(trainer?.trainerProfile?.bio || "")
    }, [trainer])

    const inputStyle = "p-1.5 rounded-xl ring-2 ring-[#00f0af]/5 focus:ring-[#00f0af] outline-none transition-all duration-200"
    
    return(
        <div className="w-[55%] mx-auto mt-7">
            <h1 className="text-3xl font-bold">Профиль</h1>
            <p className="text-[#758d87] mb-5">{trainer?.email}</p>

            <div className="flex gap-3 items-center bg-[#012022] border border-[#00f0af]/10 p-5 rounded-xl">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#00f0af] text-black text-2xl font-bold">
                    {trainer?.firstName.charAt(0).toUpperCase() || "?"}
                </div>
                <h3 className="text-xl font-bold">{trainer?.firstName || "Без имени"}</h3>
            </div>

            <form 
                className="bg-[#012022] border border-[#00f0af]/10 p-5 rounded-xl mt-7"
                onSubmit={handleUpdate}
            >
                <h5 className="font-bold mb-5">Данные тренера</h5>
                <div className="flex-row md:flex gap-3 w-full">
                    <div className="flex flex-col flex-1 mb-3">
                        <label className="mb-1.5">Имя</label>
                        <input 
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Ваше имя?"
                            className={inputStyle}
                        />
                    </div>

                    <div className="flex flex-col flex-1 mb-3">
                        <label className="mb-1.5">Фамилия</label>
                        <input 
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Ваша фамилия?"
                            className={inputStyle}
                        />
                    </div>
                </div>

                <div className="flex flex-col flex-1 mb-3">
                    <label className="mb-1.5">Специализация</label>
                    <input 
                        type="text"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        placeholder="Силовой тренинг, реабилитация..."
                        className={inputStyle}
                    />
                </div>

                <div className="flex flex-col flex-1 mb-3">
                    <label className="mb-1.5">Лет опыта</label>
                    <input 
                        type="number"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className={inputStyle}
                    />
                </div>

                <div className="flex flex-col w-full mb-3">
                    <label className="mb-1.5">О себе</label>
                    <textarea
                        value={aboutMe}
                        onChange={(e) => setAboutMe(e.target.value)}
                        placeholder="Расскажите о своем подходе"
                        className={inputStyle}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-[#00f0af] hover:bg-[#00f0af]/90 transition-all duration-200 text-black flex items-center justify-center gap-3 p-1.5 rounded-xl"
                >
                    <Save size={18}/>
                    Сохранить
                </button>
            </form>
        </div>
    )
}