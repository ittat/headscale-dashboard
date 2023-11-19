import { Node } from "../types/node";
import { Routes } from "../types/routes";
import { fetcher } from "./api";



export const routeServices = {

    getRoutes: async () => {
        const res = await fetcher<{ routes: Routes.v1Route[] }>({
            url: `/routes`,
            method: "GET",
        });

        return res ? res.routes : null
    },
    deleteRoute: async (routeid: string) => {
        const res = await fetcher({
            url: `/routes/${routeid}`,
            method: "DELETE",
        });

        return !!res
    },
    disableRouter: async (routeid: string) => {
        const res = await fetcher({
            url: `/routes/${routeid}/disable`,
            method: "POST",
        });

        return !!res
    },
    enableRouter: async (routeid: string) => {
        const res = await fetcher({
            url: `/routes/${routeid}/enable`,
            method: "POST",
        });

        return !!res
    },
}