export interface PaginationMeta {
    total : number,
    page : number,
    limit: number,
    totalPages: number
}

export interface PaginationResponse<T>{
    success : boolean,
    data: T[],
    meta : PaginationMeta
}

export interface PaginationRequest{
    page : number,
    limit: number
}

export interface ResponseType <T>{
    success : boolean
    message : string
    data : T
}

export interface FilterRequest extends Partial<PaginationRequest> {
    search ?: string,
    sortBy ?: string,
    orderBy : string
}