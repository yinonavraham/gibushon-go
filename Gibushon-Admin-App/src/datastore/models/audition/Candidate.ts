import type {ProtectedValue} from "@/datastore/models/audition/ProtectedValue";
import type {AttributeDefinitionID} from "@/datastore/models/defenition/AttributeDefinition";
import type {Value} from "@/datastore/models/audition/Value";
import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";

export class Candidate {
    id: CandidateID = "";
    personalNumber: string | ProtectedValue = "";
    firstName: string | ProtectedValue = "";
    lastName: string | ProtectedValue = "";
    attributes: Map<AttributeDefinitionID, AttributeValue> = new Map();

    constructor();
    constructor(id: CandidateID, personalNumber: string, firstName: string, lastName: string);
    constructor(id: CandidateID, personalNumber: string, firstName: string, lastName: string, attributes: Map<AttributeDefinitionID, AttributeValue>);
    constructor(...args: any[]) {
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
        throw new Error("BUG: Illegal number of arguments: " + args.length + " [" + Array.from(args) + "]");
    }

    protectValues() : void {
        //TODO Implement, probably requires the secret key as argument
    };

    discloseProtectedValues() : Error | null {
        //TODO Implement, probably requires the secret key as argument
        return null;
    }
}

export type AttributeValue = Value;