import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../Config/env.js";

export async function authGuard(req: Request, res: Response, next: NextFunction) {
    try {
        const header = req.headers.authorization
        if(!header?.startsWith("Bearer ")) {
            console.log("[GUARD DEBUG] not title");
            return res.status(401)
        }

        const token = header.slice(7)

        const payload = jwt.verify(token, env.jwtSecret || "super_secret_key");

        (req as any).user = payload
        
        next()
    }catch(err: any) {
        console.log("[GUARD DEBAG] Error", err.message);
    }
}