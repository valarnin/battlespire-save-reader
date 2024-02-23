export default interface IDeserializable {
    deserializeFrom: (buffer: Buffer) => number;
}

export type NumberStringMap = {[key: number]: string | undefined};

export class BitmaskDeserializable<T extends NumberStringMap> implements IDeserializable {
    rawValue = 0;
    bitsSet: string[] = [];

    constructor(protected bitmaskMap: T) {}

    public deserializeFrom(buffer: Buffer) {
        let offset = 0;
        this.rawValue = buffer.readUInt8(offset); offset += 1;

        for (const key in this.bitmaskMap) {
            if (typeof(key) !== 'number' && typeof(key) !== 'string') continue;
            const numKey = parseInt(key);
            const value = this.bitmaskMap[numKey];
            if (value !== undefined) {
                if ((this.rawValue & numKey) !== 0) {
                    this.bitsSet.push(value);
                }
            }
        }

        return offset;
    }
}

export class EnumDeserializable<T extends NumberStringMap> implements IDeserializable {
    rawValue = 0;
    mappedValue = '';

    constructor(protected enumMap: T) {}

    public deserializeFrom(buffer: Buffer) {
        let offset = 0;
        this.rawValue = buffer.readUInt8(offset); offset += 1;
        let mv = this.enumMap[this.rawValue];
        this.mappedValue = mv ?? 'UNKNOWN';
        return offset;
    }
}
