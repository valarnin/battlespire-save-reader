export const BufferReadFuncMap = [
    'readBigInt64BE',
    'readBigInt64LE',
    'readBigUInt64BE',
    'readBigUInt64LE',
    'readDoubleBE',
    'readDoubleLE',
    'readFloatBE',
    'readFloatLE',
    'readInt8',
    'readInt16BE',
    'readInt16LE',
    'readInt32BE',
    'readInt32LE',
    'readIntBE',
    'readIntLE',
    'readUInt8',
    'readUInt16BE',
    'readUInt16LE',
    'readUInt32BE',
    'readUInt32LE',
    'readUIntBE',
    'readUIntLE',
] as const;

export type BufferReadFuncMapType = typeof BufferReadFuncMap;

export type ValidBufferReadFuncs = BufferReadFuncMapType[number];

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