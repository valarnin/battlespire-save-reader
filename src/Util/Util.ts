export const Util = {
    deserializeString(buffer: Buffer, offset: number, length: number): string {
        let str = buffer.toString('ascii', offset, offset + length);
        return str.substring(0, str.indexOf('\0'));
    },
    deserializeUInt8Array(buffer: Buffer, offset: number, length: number): number[] {
        let ret = [];
        for (let i = 0; i < length; ++i) {
            ret.push(buffer.readUInt8(offset + i));
        }
        return ret;
    },
    deserializeFloat16(buffer: Buffer, offset: number): number {
        const binary = buffer.readUInt16LE(offset);
        const exponent = (binary & 31744) >> 10, fraction = binary & 1023;
        return (binary >> 15 ? -1 : 1) * (
            exponent ?
                (
                    exponent === 31 ?
                        fraction ? NaN : Infinity :
                        Math.pow(2, exponent - 15) * (1 + fraction / 1024)
                ) :
                0.00006103515625 * (fraction / 1024)
        );
    },
    readBoolean(buffer: Buffer, offset: number): boolean {
        return buffer.readUInt8(offset) !== 0;
    },
    strippedStringify(obj: any, padding = 2): string {
        return JSON.stringify(obj, (k, v) => {
            if (Buffer.isBuffer(v)) return undefined;
            if (k.startsWith('unknown') || k.startsWith('rawData')) return undefined;
            if (['rawValue', 'enumMap', 'bitmaskMap'].includes(k)) return undefined;
            return v;
        }, padding);
    }
} as const;
