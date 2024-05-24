import { ObjectId } from "mongodb"

export type PostViewModel = {
    id: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string | undefined
    createdAt: string
}