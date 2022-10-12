export interface Objectable {
    toObject(obj: any) : void
    fromObject(obj: any) : void
}

export function dateToObjectValue(date: Date) : string {
    return date.toISOString();
}

export function dateFromObjectValue(value: string) : Date {
    return new Date(value);
}

export function mapToObjectValue<K, V>(map: Map<K, V>) : any {
    const obj: any = {};
    map.forEach((v, k) => {
        const keyType = typeof k;
        if (keyType != "string") throw new Error("Illegal key type '" + keyType + "': " + k);
        const key: string = k as unknown as string;
        let value: any = v;
        if ("toObject" in v) {
            let vObj: Objectable = v as unknown as Objectable;
            value = {};
            vObj.toObject(value);
        }
        obj[key] = value;
    })
    return obj;
}

export function mapFromObjectValue<K, V>(obj: any, newObjectableV?: () => V) : Map<K, V> {
    const map = new Map<K, V>();
    let getValue: (key: string) => V = (key) => obj[key]
    if (typeof(newObjectableV) !== 'undefined') {
        getValue = (key) => {
            let v: V = newObjectableV();
            let objectable = v as unknown as Objectable;
            objectable.fromObject(obj[key]);
            return v;
        }
    }
    Object.keys(obj).forEach(key => {
        const k: K = key as unknown as K;
        const v: V = getValue(key);
        map.set(k, v);
    })
    return map;
}