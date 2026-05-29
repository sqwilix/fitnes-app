import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../Config/env.js';
import { prisma } from '../Utils/prisma.js';

export class AuthService {
    private static generateToken(userId: string, role: string): string {
        return jwt.sign(
            {userId, role},
            env.jwtSecret || "super_secret_key",
            {expiresIn: "1d"}
        )
    }

    static async register(data: any) {
        const {firstName, lastName, email, password, role} = data

        const candidat = await prisma.user.findUnique({where: {email}})
        if(candidat) {
            throw new Error("Пользователь с таким email уже существует")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const finalRole = role || "CLIENT"

        const result = await prisma.$transaction(async (tx: any) => {
            const user = await tx.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    role: finalRole
                }
            })

            if(finalRole === "TRAINER") {
                await tx.trainerProfile.create({
                    data: {
                        userId: user.id,
                        specialization: "",
                        experience: 0,
                        bio: "",
                        specialty: ""
                    }
                })
            }else if(finalRole === "CLIENT") {
                await tx.clientProfile.create({
                    data: {
                        userId: user.id,
                        weight: 0,
                        height: 0,
                        goal: ""
                    }
                })
            }

            return user
        })


        const token = this.generateToken(result.id, result.role)

        return {
            token,
            user: {
                id: result.id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                role: result.role
            }
        }
    }

    static async login(data: any) {
        const {email, password} = data

        const user = await prisma.user.findUnique({where: {email}})
        if(!user) {
            throw new Error("Неверный логин или пароль")
        }

        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid) {
            throw new Error("Неверный логин или пароль")
        }

        const token = this.generateToken(user.id, user.role)

        return {
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        }
    }
}