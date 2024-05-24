import { ObjectId } from "mongodb"

export type OutputBlogType = {
    id: ObjectId
    name: string
    description: string
    websiteUrl: string
}