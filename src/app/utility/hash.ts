import { sha256 } from "crypto-hash";

export const hashed = (raw: string) => {
    return sha256(raw)
}