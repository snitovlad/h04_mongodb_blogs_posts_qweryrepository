import { ObjectId } from "mongodb"

export type BlogViewModel = {
    id: ObjectId
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

