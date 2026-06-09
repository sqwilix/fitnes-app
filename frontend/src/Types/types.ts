

export interface IUser {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    createdAt: string,
    clientProfile?: {
        weight: number,
        height: number,
        goal: string
    },
    trainerProfile?: {
        bio: string,
        experience: number,
        specialization: string,
        speciality: string
    }
}

export interface IClientProfile {
    createdAt: string,
    email: string,
    firstName: string,
    id: string,
    lastName: string,
    role: string,
    updatedAt: string,
    clientProfile: {
        id: string,
        weight: number,
        height: number,
        goal: string
        subscriptions?: {
            id: string,
            status: string,
            title: string,
            totalLessons: number,
            remainingLesson: number,
            startDate: Date,
            endDate: Date,
            freezeDaysAllowed: number,
            freezeDaysRemaining: number,
            frozenAt: Date
        }[]
    }
}

export interface IWorkout {
    clientId: string,
    date: string,
    id: string,
    isCompleted: boolean,
    title: string,
    trainerId: string
}