import type {Validatable} from "@/datastore/models/common/Validatable";

export type ValueTypeDefinition =
    ScoreValueTypeDefinition |
    DurationValueTypeDefinition |
    SelectValueTypeDefinition |
    MultiSelectValueTypeDefinition

export class ScoreValueTypeDefinition implements Validatable {
    readonly type: ValueType = ScoreValueType;
    min: number | undefined;
    max: number | undefined;

    constructor();
    constructor(min: number, max: number);
    constructor(...args: any[]) {
        if (args.length == 0) return;
        if (args.length == 2) {
            this.min = args[0] as number;
            this.max = args[1] as number;
            return;
        }
        throw new Error("BUG: Illegal number of arguments: " + args.length + " [" + Array.from(args) + "]");
    }

    validate(): Error | null {
        if (this.min == undefined) return new Error("BUG: Score value type definition min is not defined");
        if (this.max == undefined) return new Error("BUG: Score value type definition max is not defined");
        return null;
    }
}

export class DurationValueTypeDefinition implements Validatable {
    readonly type: ValueType = DurationValueType;

    validate(): Error | null {
        return null;
    }
}

class BaseSelectValueTypeDefinition implements Validatable {
    values: string[] = [];
    allowCustom: boolean = false;

    constructor();
    constructor(values: string[]);
    constructor(values: string[], allowCustom: boolean);
    constructor(...args: any[]) {
        if (args.length > 2) throw new Error("BUG: Illegal number of arguments: " + args.length);
        if (args.length == 0) return;
        if (args.length <= 2) this.values = args[0] as string[];
        if (args.length == 2) this.allowCustom = args[1] as boolean;
    }

    validate(): Error | null {
        if (this.values.length == 0) return new Error("BUG: Select value type definition values array is empty");
        return null;
    }
}

export class SelectValueTypeDefinition extends BaseSelectValueTypeDefinition {
    readonly type: ValueType = SelectValueType;
}

export class MultiSelectValueTypeDefinition extends BaseSelectValueTypeDefinition {
    readonly type: ValueType = MultiSelectValueType;
}

export type ValueType = string;
export const ScoreValueType: ValueType = "score";
export const DurationValueType: ValueType = "duration";
export const SelectValueType: ValueType = "select";
export const MultiSelectValueType: ValueType = "multiselect";