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
        obj[key] = v;
    })
    return obj;
}

export function mapFromObjectValue<K, V>(obj: any) : Map<K, V> {
    const map = new Map<K, V>();
    Object.keys(obj).forEach(key => {
        const k: K = key as unknown as K;
        const v: V = obj[key];
        map.set(k, v);
    })
    return map;
}