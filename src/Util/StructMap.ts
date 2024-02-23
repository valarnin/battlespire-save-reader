export const BufferReadFuncMap = {
    'readBigInt64BE': Buffer.prototype.readBigInt64BE,
    'readBigInt64LE': Buffer.prototype.readBigInt64LE,
    'readBigUInt64BE': Buffer.prototype.readBigUInt64BE,
    'readBigUInt64LE': Buffer.prototype.readBigUInt64LE,
    'readDoubleBE': Buffer.prototype.readDoubleBE,
    'readDoubleLE': Buffer.prototype.readDoubleLE,
    'readFloatBE': Buffer.prototype.readFloatBE,
    'readFloatLE': Buffer.prototype.readFloatLE,
    'readInt8': Buffer.prototype.readInt8,
    'readInt16BE': Buffer.prototype.readInt16BE,
    'readInt16LE': Buffer.prototype.readInt16LE,
    'readInt32BE': Buffer.prototype.readInt32BE,
    'readInt32LE': Buffer.prototype.readInt32LE,
    'readIntBE': Buffer.prototype.readIntBE,
    'readIntLE': Buffer.prototype.readIntLE,
    'readUInt8': Buffer.prototype.readUInt8,
    'readUInt16BE': Buffer.prototype.readUInt16BE,
    'readUInt16LE': Buffer.prototype.readUInt16LE,
    'readUInt32BE': Buffer.prototype.readUInt32BE,
    'readUInt32LE': Buffer.prototype.readUInt32LE,
    'readUIntBE': Buffer.prototype.readUIntBE,
    'readUIntLE': Buffer.prototype.readUIntLE,
} as const;

export type BufferReadFuncMapType = typeof BufferReadFuncMap;

export type ValidBufferReadFuncs = keyof typeof BufferReadFuncMap;

export type StructMapEntry = {
    offset: number;
    length?: number;
    type?: ValidBufferReadFuncs;
};

export type StructMap = {
    [key: string]: StructMapEntry;
};

export type BufferReadFuncToTypeMap = {
    [key in ValidBufferReadFuncs]: ReturnType<Buffer[key]>;
};