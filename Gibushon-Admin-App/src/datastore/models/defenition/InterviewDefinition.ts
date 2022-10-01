import {ScoreValueTypeDefinition} from "@/datastore/models/defenition/ValueDefinition";
import type {ParameterDefinitionID} from "@/datastore/models/defenition/ParameterDefinition";

export class InterviewDefinition {
    description: string | undefined;
    parameterIDs: Set<ParameterDefinitionID> = new Set();
    score: ScoreValueTypeDefinition = new ScoreValueTypeDefinition();
}
