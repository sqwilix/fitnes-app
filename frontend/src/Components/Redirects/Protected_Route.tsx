import { Navigate, Outlet } from "react-router-dom"


export default function ProtectedRoute({allowedRole}: {allowedRole: "TRAINER" | "CLIENT" | "ADMIN"}) {
    const userString = localStorage.getItem("user")
    const user = userString ? JSON.parse(userString) : null

    if(!user) {
        return <Navigate to='/auth' replace/>
    }

    if(user.role !== allowedRole) {
        return <Navigate to={user.role === "TRAINER" ? "/trainer" : "/client"} replace/>
    }

    return <Outlet/>
}