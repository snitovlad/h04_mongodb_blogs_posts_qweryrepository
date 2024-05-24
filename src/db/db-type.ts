import { ObjectId } from "mongodb"

export type BlogDBType = {
    _id: ObjectId
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type PostDBType = {
    _id: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string | undefined
    createdAt: string
}