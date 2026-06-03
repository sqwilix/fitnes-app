import {Dumbbell} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()

    return(
        <header className="w-full flex justify-between items-center py-7 px-14">
            <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
                <span
                    className='bg-[#00f0af] p-2 rounded-full text-black'
                >
                    <Dumbbell size={22}/>
                </span>
                <h2 className='text-xl font-bold'>Smart Coaching</h2>
            </div>

            {location.pathname === '/' && (
                <button
                    type='button'
                    onClick={() => navigate('/auth')}
                    className='hover:bg-[#00f0af]/30 py-1.5 px-4 rounded-xl transition-all duration-200'
                >
                    Войти
                </button>
            )}
        </header>
    )
}