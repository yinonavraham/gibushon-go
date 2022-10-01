import type {ScoreValue} from "@/datastore/models/audition/Value";
import type {ParameterDefinitionID} from "@/datastore/models/defenition/ParameterDefinition";

export class ParameterInfo {
    parameterDefinitionID : ParameterDefinitionID | undefined;
    name : string | undefined;
    comments: Set<string> = new Set();
    score: ScoreValue | undefined;
}