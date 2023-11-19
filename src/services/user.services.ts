import { USER } from "../types/user";
import { fetcher } from "./api";



export  const userServices = {

    getUsersList: async () => {
        const res = await fetcher<{users:USER.v1User[]}>({
            url:  `/user`,
            method: "GET",
        });

        return res ? res.users : null
    },
    addUser: async (name:string) => {
        const res = await fetcher<USER.v1CreateUserRequest>({
            url:  `/user`,
            method: "POST",
            body:{  name }
        });

       return res ? res.user : null
    },
    deleteUser: async (name:string) => {
        const res = await fetcher({
            url:  `/user/${name}`,
            method: "DELETE",
        });

        return !!res
    },
    getUserByName: async (name:string) => {
        const res = await fetcher<{user:USER.v1User}>({
            url:  `/user/${name}`,
            method: "GET",
        });

        return res ? res.user : null
    },
    renameUser: async (name:string, newName:string) => {
        const res = await fetcher<{user:USER.v1User}>({
            url:  `/user/${name}/rename/${newName}`,
            method: "POST",
            body:{  }
        });
       return res ? res.user : null
    }


}