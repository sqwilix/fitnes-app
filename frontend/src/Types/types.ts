

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
    updatedAt: string
}