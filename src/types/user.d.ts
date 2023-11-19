

export namespace USER {

    export interface  v1CreateUserRequest {
        user: v1User
    }


    export  interface 	v1User {
        id: string,
        name:string,
        createdAt: string
    }
}