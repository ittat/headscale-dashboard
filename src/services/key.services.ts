import { ApiKey, AuthKey } from "../types/key";
import { Node } from "../types/node";
import { fetcher } from "./api";



export const keyServices = {

    getApiKeys: async () => {
        const res = await fetcher<{ apiKeys: ApiKey.v1Key[] }>({
            url: `/apikey`,
            method: "GET",
        });

        return res ? res.apiKeys : null
    },
    addApiKey: async (expiration: Date) => {
        const res = await fetcher<{ apiKey:string }>({
            url: `/apikey`,
            method: "POST",
            body: { expiration : expiration.toISOString() }
        });

        return res ? res.apiKey : null
    },
    expireApiKey: async (prefix: string) => {
        const res = await fetcher({
            url: `/apikey/expire`,
            method: "POST",
            body:{prefix}
        });

        return !!res
    },

    getPreAuthKeys: async (user:string) => {
        const res = await fetcher<{ apiKeys: AuthKey.v1Key[] }>({
            url: `/preauthkey`,
            method: "GET",
            body:{user}
        });

        return res ? res.apiKeys : null
    },
    addPreAuthKey: async (body:{
        user:string,
        reusable:boolean,
        ephemeral: boolean,
        expiration: Date,
        aclTags?:string[]
    }) => {
        if(body.expiration){
            // @ts-ignore
            body.expiration = body.expiration.toISOString();
        }
        const res = await fetcher<{ preAuthKey:AuthKey.v1Key }>({
            url: `/preauthkey`,
            method: "POST",
           body
        });

        return res ? res.preAuthKey : null
    },
    expirePreAuthKey: async (user:string,key:string) => {
        const res = await fetcher({
            url: `/preauthkey/expire`,
            method: "POST",
            body:{
                user,
                key
            }
        });

        return !!res
    },
   


}