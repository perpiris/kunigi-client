export interface PagedResponse<T> {
    items: T[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}