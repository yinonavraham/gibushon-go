import type {EntityID} from "@/datastore/models/common/Entity";
import type {Validatable} from "@/datastore/models/common/Validatable";
import type {Objectable} from "@/datastore/models/common/Objectable";

export type UnitID = EntityID;

export class Unit implements Validatable, Objectable {
    id : UnitID = "";
    name: string = "";

    validate(): Error | null {
        if (!this.id) return Error("BUG: Unit ID is not defined");
        if (!this.name) return Error("BUG: Unit name is not defined");
        return null;
    }

    toObject(obj: any) {
        obj.id = this.id;
        obj.name = this.name;
    }

    fromObject(obj: any) {
        this.id = obj.id;
        this.name = obj.name;
    }
}