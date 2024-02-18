import { Node } from "../types/node";
import { fetcher } from "./api";



export const nodeServices = {

    getNodes: async (user?: string) => {
        const res = await fetcher<{ nodes: Node.v1Node[] }>({
            url: `/node`,
            method: "GET",
            params: user ? { user } : null
        });

        return res ? res.nodes : null
    },
    addNode: async (user?: string, key?: string) => {
        if(!key.startsWith("mkey:")){
            key = "mkey:" +key
        }z
        const res = await fetcher<{ node: Node.v1Node }>({
            url: `/node/register`,
            method: "POST",
            params: { user,key }
        });

        return res ? res.node : null
    },
    deleteNode: async (nodeid: string) => {
        const res = await fetcher({
            url: `/node/${nodeid}`,
            method: "DELETE",
        });

        return !!res
    },
    getNodeById: async (nodeid: string) => {
        const res = await fetcher<{ node: Node.v1Node }>({
            url: `/node/${nodeid}`,
            method: "GET",
        });

        return res ? res.node : null
    },
    renameNode: async (nodeid: string, newName: string) => {
        const res = await fetcher<{ node: Node.v1Node }>({
            url: `/node/${nodeid}/rename/${newName}`,
            method: "POST",
            body: {}
        });
        return res ? res.node : null
    }


}