import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RedirectProps {
    children: ReactNode
}

export default function NotAuthRedurect({children}: RedirectProps) {
    const user = (() => {
        try {
            const storedUser = localStorage.getItem("user")
            return storedUser ? JSON.parse(storedUser) : null
        }catch {
            return null
        }
    })()

    if(user) {
        return <Navigate to='/clientHome' replace/>
    }

    return children
}