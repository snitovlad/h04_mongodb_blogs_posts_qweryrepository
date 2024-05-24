import { BlogViewModel } from "./BlogViewModel";

export type BlogsViewModel = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number;
    items: BlogViewModel[]
}