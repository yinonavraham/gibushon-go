import {ScoreValue, scoreValueFromObjectValue, scoreValueToObjectValue} from "@/datastore/models/audition/Value";
import type {ParameterDefinitionID} from "@/datastore/models/defenition/ParameterDefinition";
import type {Objectable} from "@/datastore/models/common/Objectable";

export class ParameterInfo implements Objectable {
    parameterDefinitionID : ParameterDefinitionID = "";
    name : string = "";
    comments: Set<string> = new Set();
    score: ScoreValue = new ScoreValue();

    toObject(obj: any) {
        obj.parameterDefinitionID = this.parameterDefinitionID;
        obj.parameterDefinitionID = this.name;
        obj.parameterDefinitionID = this.comments;
        obj.parameterDefinitionID = scoreValueToObjectValue(this.score);
    }

    fromObject(obj: any) {
        this.parameterDefinitionID = obj.parameterDefinitionID;
        this.name = obj.name;
        this.comments = obj.comments;
        this.score = scoreValueFromObjectValue(obj.score);
    }
}