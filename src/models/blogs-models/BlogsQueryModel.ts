import { SortDirection } from "mongodb"

export type BlogsQueryModel = {
    searchNameTerm?: string | null
    sortBy?: string
    sortDirection?: SortDirection
    pageNumber?: number
    pageSize?: number
}