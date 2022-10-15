import type {EntityID} from "@/datastore/models/common/Entity";
import type {AttributeDefinitionID} from "@/datastore/models/defenition/AttributeDefinition";
import {AttributeDefinition} from "@/datastore/models/defenition/AttributeDefinition";
import type {ParameterDefinitionID} from "@/datastore/models/defenition/ParameterDefinition";
import {ParameterDefinition} from "@/datastore/models/defenition/ParameterDefinition";
import type {TestDefinitionID} from "@/datastore/models/defenition/TestDefinition";
import {TestDefinition} from "@/datastore/models/defenition/TestDefinition";
import {InterviewDefinition} from "@/datastore/models/defenition/InterviewDefinition";
import {generateUniqueID} from "@/utils/UniqueID";
import type {ValueTypeDefinition} from "@/datastore/models/defenition/ValueDefinition";
import type {ScoreValueTypeDefinition} from "@/datastore/models/defenition/ValueDefinition";

export type AuditionDefinitionID = EntityID;

export class AuditionDefinition {
    id : AuditionDefinitionID = "";
    lockedAt? : Date;
    candidateDefinitions: CandidateDefinitions = new CandidateDefinitions();
    parameterDefinitions: Map<ParameterDefinitionID, ParameterDefinition> = new Map();
    summaryParameterIDs: Set<ParameterDefinitionID> = new Set();
    testDefinitions: Map<TestDefinitionID, TestDefinition> = new Map();
    interviewDefinition: InterviewDefinition = new InterviewDefinition();

    addParameterDefinition(name: string, description: string, type: ValueTypeDefinition) : ParameterDefinition {
        let id = generateUniqueID("prmdef")
        let paramDef = new ParameterDefinition(id, name, description, type);
        let err = paramDef.validate();
        if (err != null) throw err;
        this.parameterDefinitions.set(id, paramDef);
        return paramDef;
    }

    addTestDefinition(name: string, description: string, intensityGroup: number,
                      paramDefinitionIDs: Set<ParameterDefinitionID>, score: ScoreValueTypeDefinition) : TestDefinition {
        let id = generateUniqueID("tstdef")
        let testDef = new TestDefinition(id, name, description, intensityGroup, paramDefinitionIDs, score);
        let err = testDef.validate();
        if (err != null) throw err;
        this.testDefinitions.set(id, testDef);
        return testDef;
    }
}

export class CandidateDefinitions {
    attributes: Map<AttributeDefinitionID, AttributeDefinition> = new Map();
    quitReasons: QuitReasonsDefinition = new QuitReasonsDefinition();

    addAttributeDefinition(name: string, description: string, type: ValueTypeDefinition) : AttributeDefinition {
        let id = generateUniqueID("atrdef")
        let attributeDef = new AttributeDefinition(id, name, description, type);
        let err = attributeDef.validate();
        if (err != null) throw err;
        this.attributes.set(id, attributeDef);
        return attributeDef;
    }
}

export class QuitReasonsDefinition {
    values: string[] = [];
    allowCustom: boolean = false;
}