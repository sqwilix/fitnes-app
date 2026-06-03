import { Outlet } from "react-router-dom";
import AsidePanel from "../Layout/Aside_Panel";


export default function TrainerLayout() {
    return(
        <div className="flex w-full min-h-screen">
            <div className="w-[20%] max-w-[300px] border-r border-white/10">
                <AsidePanel/>
            </div>

            <main className="flex-1 p-6">
                <Outlet/>
            </main>
        </div>
    )
}