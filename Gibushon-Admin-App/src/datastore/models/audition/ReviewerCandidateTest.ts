import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import type {ParameterDefinitionID} from "@/datastore/models/defenition/ParameterDefinition";
import type {ParameterInfo} from "@/datastore/models/audition/ParameterInfo";
import type {TeamTestID} from "@/datastore/models/audition/ReviewerTeamTest";
import type {ScoreValue} from "@/datastore/models/audition/Value";

export class ReviewerCandidateTest {
    candidateID: CandidateID | undefined;
    teamTestID: TeamTestID | undefined;
    parameters: Map<ParameterDefinitionID, ParameterInfo> = new Map();
    comments: Set<string> = new Set();
    score: ScoreValue | undefined;
}