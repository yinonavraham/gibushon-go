// @ts-ignore
import { monotonicFactory } from "ulid";

const ulid = monotonicFactory();

export type UniqueID = string

export function generateUniqueID(prefix : string) : UniqueID {
    return prefix + "_" + ulid(new Date().getUTCDate());
}