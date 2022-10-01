import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import type {UnitID} from "@/datastore/models/audition/Unit";
import type {ParameterDefinitionID} from "@/datastore/models/defenition/ParameterDefinition";
import type {UserID} from "@/datastore/models/users/UserProfile";

export class CandidateSummary {
    candidateID: CandidateID | undefined;
    testScore: ScoreSummary | undefined;
    testComments: Map<UserID, string> = new Map();
    interviewScore: ScoreSummary | undefined;
    interviewComments: Map<UserID, string> = new Map();
    sociometricScore: number | undefined;
    finalScore: ScoreSummary | undefined;
    parameterScores: Map<ParameterDefinitionID, number> = new Map();
}

export class ScoreSummary {
    aggregatedScore : AggregatedNormalizedScoreValue | undefined
    perUnit: Map<UnitID, AggregatedNormalizedScoreValue> = new Map();
}

export class AggregatedNormalizedScoreValue {
    value: number | undefined;
    standardDeviation: number | undefined;
    minValue: number | undefined;
    maxValue: number | undefined;
}