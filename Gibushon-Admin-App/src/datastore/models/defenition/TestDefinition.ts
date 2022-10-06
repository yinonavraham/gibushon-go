import type {EntityID} from "@/datastore/models/common/Entity";
import {ScoreValueTypeDefinition} from "@/datastore/models/defenition/ValueDefinition";
import type {ParameterDefinitionID} from "@/datastore/models/defenition/ParameterDefinition";
import type {Validatable} from "@/datastore/models/common/Validatable";
import {newIllegalNumberOfArgsError} from "@/datastore/models/common/Errors";

export type TestDefinitionID = EntityID

export class TestDefinition implements Validatable {
    id: TestDefinitionID = "";
    name: string = "";
    description: string = "";
    intensityGrade: number = -1;
    parameterIDs: Set<ParameterDefinitionID> = new Set();
    score: ScoreValueTypeDefinition = new ScoreValueTypeDefinition();

    constructor();
    constructor(id: TestDefinitionID, name: string, description: string, intensityGrade: number, parameterIDs: Set<ParameterDefinitionID>, score: ScoreValueTypeDefinition);
    constructor(...args: any[]) {
        if (args.length == 0) return;
        if (args.length == 6) {
            this.id = args[0] as TestDefinitionID;
            this.name = args[1] as string;
            this.description = args[2] as string;
            this.intensityGrade = args[3] as number;
            (args[4] as Set<ParameterDefinitionID>).forEach((v) => this.parameterIDs.add(v));
            this.score = args[5] as ScoreValueTypeDefinition
            return;
        }
        throw newIllegalNumberOfArgsError(args);
    }

    validate(): Error | null {
        if (!this.id) return new Error("BUG: Test definition id is not defined");
        if (!this.name) return new Error("BUG: Test definition id is not defined");
        if (this.intensityGrade < 0) return new Error("BUG: Test definition id is not defined (is negative)");
        return this.score.validate();
    }
}
