import { SortDirection } from "mongodb"

export type PostsQueryModel = {
    sortBy?: string
    sortDirection?: SortDirection
    pageNumber?: number
    pageSize?: number
}