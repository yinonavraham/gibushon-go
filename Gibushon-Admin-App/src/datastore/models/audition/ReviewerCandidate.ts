import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import type {ParameterDefinitionID} from "@/datastore/models/defenition/ParameterDefinition";
import type {ParameterInfo} from "@/datastore/models/audition/ParameterInfo";

export class ReviewerCandidate {
    candidateID : CandidateID | undefined;
    active : boolean | undefined;
    quitTime : Date | undefined;
    quitReason : string = "";
    parameters: Map<ParameterDefinitionID, ParameterInfo> = new Map();
    comments: Set<string> = new Set();
}