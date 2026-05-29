import { 
    User as PrismaUser,
    TrainerProfile as PrismaTrainer,
    ClientProfile as PrismaClient,
    Subscription as PrismaSubscription,
    WorkoutSession as PrismaWorkout
} from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export type IUser = Omit<PrismaUser, 'password'>; 
export type ITrainer = PrismaTrainer;
export type IClient = PrismaClient;
export type ISubscription = PrismaSubscription;
export type IWorkout = PrismaWorkout;

export type JwtPayloadUser = {
    userId: string;
    role: "TRAINER" | "CLIENT" | "ADMIN";
};

export type AuthRequest = Request & {user: JwtPayloadUser}

export type ControllerMethods = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => Promise<any>