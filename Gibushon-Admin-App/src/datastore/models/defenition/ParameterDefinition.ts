import type {EntityID} from "@/datastore/models/common/Entity";
import type {ValueTypeDefinition} from "@/datastore/models/defenition/ValueDefinition";
import type {Validatable} from "@/datastore/models/common/Validatable";
import {newIllegalNumberOfArgsError} from "@/datastore/models/common/Errors";

export type ParameterDefinitionID = EntityID

export class ParameterDefinition implements Validatable {
    id: ParameterDefinitionID = "";
    name: string = "";
    description: string = "";
    type: ValueTypeDefinition | undefined;

    constructor();
    constructor(id: ParameterDefinitionID, name: string, description: string, type: ValueTypeDefinition);
    constructor(...args: any[]) {
        if (args.length == 0) {
            return;
        }
        if (args.length == 4) {
            this.id = args[0] as ParameterDefinitionID;
            this.name = args[1] as string;
            this.description = args[2] as string;
            this.type = args[3] as ValueTypeDefinition;
            return;
        }
        throw newIllegalNumberOfArgsError(args);
    }

    validate() : Error | null {
        if (!this.id) return new Error("BUG: Parameter definition id is missing");
        if (!this.name) return new Error("BUG: Parameter definition name is not defined");
        if (!this.type) return new Error("BUG: Parameter definition type is not defined");
        return this.type.validate();
    }
}

