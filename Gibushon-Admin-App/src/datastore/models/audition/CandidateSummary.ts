import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import {Entity} from "@/datastore/models/common/Entity";
import type {AuditionID} from "@/datastore/models/audition/Audition";
import {
    ProtectedValue,
    protectedValueFromObjectValue,
    protectedValueToObjectValue
} from "@/datastore/models/audition/ProtectedValue";
import type {AttributeValue} from "@/datastore/models/audition/Candidate";
import {mapFromObjectValue, mapToObjectValue} from "@/datastore/models/common/Objectable";
import type {Objectable} from "@/datastore/models/common/Objectable";

type ReviewerName = string;
type AttributeName = string;
type ParameterName = string;
type UnitName = string;

export class CandidateSummary extends Entity {
    candidateID: CandidateID = "";
    auditionID: AuditionID = "";
    // Candidate
    personalNumber: string | ProtectedValue = "";
    firstName: string | ProtectedValue = "";
    lastName: string | ProtectedValue = "";
    attributes: Map<AttributeName, AttributeValue> = new Map();
    // Candidate Status
    number: number = 0;
    teamNumber: number = 0;
    // Summary
    testScore: ScoreSummary = new ScoreSummary();
    testComments: Map<ReviewerName, string> = new Map();
    interviewScore: ScoreSummary = new ScoreSummary();
    interviewComments: Map<ReviewerName, string> = new Map();
    sociometricScore: number = -1;
    finalScore: ScoreSummary = new ScoreSummary();
    parameterScores: Map<ParameterName, number> = new Map();

    toObject(obj: any) {
        super.toObject(obj);
        obj.candidateID = this.candidateID;
        obj.auditionID = this.auditionID;
        obj.personalNumber = protectedValueToObjectValue(this.personalNumber);
        obj.firstName = protectedValueToObjectValue(this.firstName);
        obj.lastName = protectedValueToObjectValue(this.lastName);
        obj.attributes = mapToObjectValue(this.attributes);
        obj.number = this.number;
        obj.teamNumber = this.teamNumber;
        obj.testScore = scoreSummaryToObjectValue(this.testScore);
        obj.testComments = mapToObjectValue(this.testComments);
        obj.interviewScore = scoreSummaryToObjectValue(this.interviewScore);
        obj.interviewComments = mapToObjectValue(this.interviewComments);
        obj.sociometricScore = this.sociometricScore;
        obj.finalScore = scoreSummaryToObjectValue(this.finalScore);
        obj.parameterScores = mapToObjectValue(this.parameterScores);
    }

    fromObject(obj: any) {
        super.fromObject(obj);
        this.candidateID = obj.candidateID;
        this.auditionID = obj.auditionID;
        this.personalNumber = protectedValueFromObjectValue(obj.personalNumber);
        this.firstName = protectedValueFromObjectValue(obj.firstName);
        this.lastName = protectedValueFromObjectValue(obj.lastName);
        this.attributes = mapFromObjectValue(obj.attributes);
        this.number = obj.number;
        this.teamNumber = obj.teamNumber;
        this.testScore = scoreSummaryFromObjectValue(obj.testScore);
        this.testComments = mapFromObjectValue(obj.testComments);
        this.interviewScore = scoreSummaryFromObjectValue(obj.interviewScore);
        this.interviewComments = mapFromObjectValue(obj.interviewComments);
        this.sociometricScore = obj.sociometricScore;
        this.finalScore = scoreSummaryFromObjectValue(obj.finalScore);
        this.parameterScores = mapFromObjectValue(obj.parameterScores);
    }
}

export class ScoreSummary {
    aggregatedScore: AggregatedNormalizedScoreValue | undefined
    perUnit: Map<UnitName, AggregatedNormalizedScoreValue> = new Map();
}

function scoreSummaryToObjectValue(score: ScoreSummary): any {
    return {
        aggregatedScore: scoreValueToObjectValue(score.aggregatedScore),
        perUnit: mapToObjectValue(score.perUnit)
    }
}

function scoreSummaryFromObjectValue(value: any): ScoreSummary {
    const score = new ScoreSummary();
    score.aggregatedScore = scoreValueFromObjectValue(value.aggregatedScore);
    score.perUnit = mapFromObjectValue(value.perUnit);
    return score;
}

export class AggregatedNormalizedScoreValue implements Objectable {
    value: number | undefined;
    standardDeviation: number | undefined;
    minValue: number | undefined;
    maxValue: number | undefined;

    toObject(obj: any) {
        obj.value = this.value;
        obj.standardDeviation = this.standardDeviation;
        obj.minValue = this.minValue;
        obj.maxValue = this.maxValue;
    }

    fromObject(obj: any) {
        this.value = obj.value;
        this.standardDeviation = obj.standardDeviation;
        this.minValue = obj.minValue;
        this.maxValue = obj.maxValue;
    }
}

function scoreValueToObjectValue(scoreValue: AggregatedNormalizedScoreValue | undefined): any {
    if (typeof (scoreValue) === 'undefined') return undefined;
    const value: any = {};
    scoreValue.toObject(value);
    return value;
}

function scoreValueFromObjectValue(value: any): AggregatedNormalizedScoreValue | undefined {
    if (typeof (value) === 'undefined') return undefined;
    const scoreValue = new AggregatedNormalizedScoreValue();
    scoreValue.fromObject(value);
    return scoreValue;
}