import type {EntityID} from "@/datastore/models/common/Entity";
import type {Validatable} from "@/datastore/models/common/Validatable";

export type UnitID = EntityID;

export class Unit implements Validatable {
    id : UnitID | undefined;
    name: string | undefined;

    validate(): Error | null {
        if (!this.id) return Error("BUG: Unit ID is not defined");
        if (!this.name) return Error("BUG: Unit name is not defined");
        return null;
    }
}