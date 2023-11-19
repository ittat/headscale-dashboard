import { AuthKey } from "./key"
import { USER } from "./user"


export namespace Node {



    export interface v1Node {
        id: string,
        machineKey: string
        nodeKey: string
        discoKey: string
        ipAddresses: string[],
        name: string,
        user: USER.v1User,
        lastSeen: string
        lastSuccessfulUpdate: string
        expiry: string,
        createdAt: string,
        preAuthKey: AuthKey.v1Key,
        forcedTags: string[],
        invalidTags: string[],
        validTags: string[]
        givenName: string
        online: boolean
    }

 
}