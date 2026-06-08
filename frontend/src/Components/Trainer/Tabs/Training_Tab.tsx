import { Plus, X } from "lucide-react"
import { useState } from "react"

interface TrainingTabProps {
    workouts: string[],
    isOpen: boolean,
    title: string,
    setTitle: (val: string) => void,
    date: string,
    setDate: (val: string) => void,
    setIsOpen: (val: boolean) => void,
    exercises: Exercise[],
    setExercises: (val: Exercise[]) => void,
    onSubmit: (e: React.FormEvent) => Promise<void>
}

export interface Exercise {
    id: number,
    name: string,
    sets: string,
    reps: string,
    weight: string
}

export default function TrainingTab({workouts, isOpen, setIsOpen, onSubmit, title, setTitle, date, setDate}: TrainingTabProps) {
    const [exercise, setExercise] = useState<Exercise[]>([])
    const inputStyle = "p-1.5 rounded-xl ring-2 ring-[#00f0af]/5 focus:ring-[#00f0af] outline-none transition-all duration-200"

    const addExercise = () => {
        setExercise([...exercise, {id: Date.now(), name: "", sets: "", reps: "", weight: ""}])
    }

    const removeExercese = (id: number) => {
        setExercise(exercise.filter(e => e.id !== id))
    }

    const updateExercise = (id: number, field: keyof Exercise, value: string) => {
        setExercise(exercise.map(e => e.id === id ? {...e, [field] : value} : e))
    }

    return(
        <div className="flex flex-col mt-7">
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-[#00f0af] hover:bg-[#00f0af]/90 text-black w-fit py-1.5 px-3 flex gap-3 items-center rounded-xl transition-all duration-200 mb-5"
            >
                <Plus size={18}/>
                Создать тренировку
            </button>

            <div className="bg-[#012022] border border-dashed border-[#00f0af]/10 p-10 rounded-xl">
                {workouts.length === 0 ? (
                    <div className="w-full">
                        <p className="text-center text-gray-400 text-[17px]">Тренировок ещё нет</p>
                    </div>
                ) : (
                    workouts.map((workout) => (
                        <ul>
                            
                        </ul>
                    ))
                )}
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center w-full h-screen">
                    <form 
                        className="flex flex-col w-[60%] bg-[#001518] border border-[#00f0af]/10 p-3 rounded-xl"
                        onSubmit={onSubmit}
                    >
                        <div className="flex items-center justify-between w-full">
                            <h4 className="font-medium text-xl mb-3">Новая тренировка</h4>

                            <button
                                onClick={() => setIsOpen(false)}
                            >
                                <X/>
                            </button>
                        </div>

                        <div className="flex-row md:flex gap-3 w-full">
                            <div className="flex flex-col flex-1">
                                <label>Название</label>
                                <input 
                                    type="text"
                                    placeholder="День груди"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={inputStyle} 
                                />
                            </div>

                            <div className="flex flex-col flex-1">
                                <label>Дата</label>
                                <input 
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className={inputStyle}
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <h5>Упражнения</h5>
                            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
                                {exercise.map((ex) => (
                                    <div key={ex.id} className="flex gap-2 items-center bg-[#012022] p-2 rounded-lg border border-[#00f0af]/5">
                                        <input placeholder="Упражнение" className={`${inputStyle} flex-[2]`} value={ex.name} onChange={(e) => updateExercise(ex.id, 'name', e.target.value)} />
                                        <input placeholder="Подходы" className={`${inputStyle} w-16`} value={ex.sets} onChange={(e) => updateExercise(ex.id, 'sets', e.target.value)} />
                                        <input placeholder="Повт." className={`${inputStyle} w-16`} value={ex.reps} onChange={(e) => updateExercise(ex.id, 'reps', e.target.value)} />
                                        <input placeholder="Кг" className={`${inputStyle} w-16`} value={ex.weight} onChange={(e) => updateExercise(ex.id, 'weight', e.target.value)} />
                                        <button onClick={() => removeExercese(ex.id)} className="text-red-400 hover:text-red-600">
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={addExercise}
                                className="flex items-center gap-1.5 text-sm border border-[#00f0af]/10 py-1.5 px-3 rounded-xl hover:bg-[#00f0af]/30 transition-all duration-200 mt-3"
                            >
                                <Plus size={18}/>
                                Добавить упражнение
                            </button>
                        </div>
                        
                        <div className="w-full flex justify-end items-end">
                            <button
                                type="submit"
                                className="bg-[#00f0af] hover:bg-[#00f0af]/90 text-black w-fit py-1.5 px-3 flex gap-3 items-center rounded-xl transition-all duration-200 mt-5"
                            >
                                Сохранить
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}