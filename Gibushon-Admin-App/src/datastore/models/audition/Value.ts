export type Value = ScoreValue | TextValue | NumberValue | DurationValue;

export class ScoreValue {
    value: number = 0;
    normalized: number = 0;
}

export type TextValue = string;
export type NumberValue = number;
export type DurationValue = string;