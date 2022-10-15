import type {Objectable} from "@/datastore/models/common/Objectable";

export type Value = ScoreValue | TextValue | NumberValue | DurationValue;

export class ScoreValue implements Objectable {
    value: number = 0;
    normalized: number = 0;

    toObject(obj: any) {
        obj.value = this.value;
        obj.normalized = this.normalized;
    }

    fromObject(obj: any) {
        this.value = obj.value;
        this.normalized = obj.normalized;
    }
}

export type TextValue = string;
export type NumberValue = number;
export type DurationValue = string;

export function scoreValueToObjectValue(scoreValue: ScoreValue) : any {
    const obj: any = {};
    scoreValue.toObject(obj);
    return obj;
}

export function scoreValueFromObjectValue(obj: any) : ScoreValue {
    const scoreValue = new ScoreValue();
    scoreValue.fromObject(obj);
    return scoreValue;
}