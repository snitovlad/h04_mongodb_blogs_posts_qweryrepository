import { SortDirection } from "mongodb"

export type PostsSanitizedQueryModel = {
    sortBy: string
    sortDirection: SortDirection
    pageNumber: number
    pageSize: number
}