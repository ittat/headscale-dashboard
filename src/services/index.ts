import { keyServices } from "./key.services";
import { nodeServices } from "./node.services";
import { routeServices } from "./routes.services";
import { userServices } from "./user.services";


const services = {
    user:userServices,
    node:nodeServices,
    routes:routeServices,
    key:keyServices
}

export default services