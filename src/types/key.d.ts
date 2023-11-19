import { USER } from "./user";

export namespace ApiKey {
  export interface v1Key {
    id: string;
    prefix: string;
    expiration: string;
    createdAt: string;
    lastSeen: string;
  }
}

export namespace AuthKey {
  export interface v1Key {
    user: string;
    id: string;
    key: string;
    reusable: boolean;
    used: boolean;
  }
}
