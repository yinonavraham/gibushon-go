export class ProtectedValue {
    encrypted: string = "";
    digest: string = "";
}

export function protectedValueToObjectValue(value: ProtectedValue | string) : any {
    if (typeof(value) === "string") {
        return value;
    }
    const objVal: any = {};
    objVal.encrypted = value.encrypted;
    objVal.digest = value.digest;
    return objVal;
}

export function protectedValueFromObjectValue(value: any) : ProtectedValue | string {
    if (typeof(value) === "string") {
        return value as string;
    }
    const pv = new ProtectedValue();
    pv.encrypted = value.encrypted;
    pv.digest = value.digest;
    return pv;
}