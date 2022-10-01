import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import type {ParameterDefinitionID} from "@/datastore/models/defenition/ParameterDefinition";
import type {ParameterInfo} from "@/datastore/models/audition/ParameterInfo";
import type {ScoreValue} from "@/datastore/models/audition/Value";
import type {UnitID} from "@/datastore/models/audition/Unit";

export class ReviewerCandidateSummary {
    candidateID: CandidateID | undefined;
    parameters: Map<ParameterDefinitionID, ParameterInfo> = new Map();
    comments: Set<string> = new Set();
    score: ScoreValue | undefined;
    scorePerUnit: Map<UnitID, ScoreValue> = new Map();
}