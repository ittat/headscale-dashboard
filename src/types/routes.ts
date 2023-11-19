import { Node } from "./node";
import { USER } from "./user";

export namespace Routes {
  export interface v1Route {
    id: string;
    node: Node.v1Node;
    prefix: string;
    advertised: boolean;
    enabled: boolean;
    isPrimary: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  }
}
