
export interface Workspace {
    id : number,
    title : string,
    description : string,
    member_count : number,
    Owner : {
        id : number,
        username : string
    }
}