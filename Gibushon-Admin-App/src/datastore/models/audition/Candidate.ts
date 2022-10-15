import type {ProtectedValue} from "@/datastore/models/audition/ProtectedValue";
import type {AttributeDefinitionID} from "@/datastore/models/defenition/AttributeDefinition";
import type {Value} from "@/datastore/models/audition/Value";
import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import {newIllegalNumberOfArgsError} from "@/datastore/models/common/Errors";
import {Entity} from "@/datastore/models/common/Entity";
import {protectedValueFromObjectValue, protectedValueToObjectValue} from "@/datastore/models/audition/ProtectedValue";
import {mapFromObjectValue, mapToObjectValue} from "@/datastore/models/common/Objectable";
import type {AuditionID} from "@/datastore/models/audition/Audition";

export class Candidate extends Entity {
    id: CandidateID = "";
    auditionID: AuditionID = "";
    personalNumber: string | ProtectedValue = "";
    firstName: string | ProtectedValue = "";
    lastName: string | ProtectedValue = "";
    attributes: Map<AttributeDefinitionID, AttributeValue> = new Map();

    constructor();
    constructor(id: CandidateID, personalNumber: string, firstName: string, lastName: string);
    constructor(id: CandidateID, personalNumber: string, firstName: string, lastName: string, attributes: Map<AttributeDefinitionID, AttributeValue>);
    constructor(...args: any[]) {
        super();
        if (args.length == 0) return;
        if (args.length >= 4) {
            this.id = args[0] as CandidateID;
            this.personalNumber = args[1] as string;
            this.firstName = args[2] as string;
            this.lastName = args[3] as string;
        }
        if (args.length == 4) return;
        if (args.length == 5) {
            this.attributes = args[4] as Map<AttributeDefinitionID, AttributeValue>;
            return;
        }
        throw newIllegalNumberOfArgsError(args);
    }

    protectValues() : void {
        //TODO Implement, probably requires the secret key as argument
    };

    discloseProtectedValues() : Error | null {
        //TODO Implement, probably requires the secret key as argument
        return null;
    }

    toObject(obj: any) {
        super.toObject(obj);
        obj.id = this.id;
        obj.auditionID = this.auditionID;
        obj.personalNumber = protectedValueToObjectValue(this.personalNumber);
        obj.firstName = protectedValueToObjectValue(this.firstName);
        obj.lastName = protectedValueToObjectValue(this.lastName);
        obj.attributes = mapToObjectValue(this.attributes);
    }

    fromObject(obj: any) {
        super.fromObject(obj);
        obj.id = this.id;
        obj.auditionID = this.auditionID;
        obj.personalNumber = protectedValueFromObjectValue(this.personalNumber);
        obj.firstName = protectedValueFromObjectValue(this.firstName);
        obj.lastName = protectedValueFromObjectValue(this.lastName);
        obj.attributes = mapFromObjectValue(this.attributes);
    }
}

export type AttributeValue = Value;