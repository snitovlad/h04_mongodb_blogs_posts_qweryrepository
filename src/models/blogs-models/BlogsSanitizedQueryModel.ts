import { SortDirection } from "mongodb"

export type BlogsSanitizedQueryModel = {
    searchNameTerm: string | null
    sortBy: string
    sortDirection: SortDirection
    pageNumber: number
    pageSize: number
}