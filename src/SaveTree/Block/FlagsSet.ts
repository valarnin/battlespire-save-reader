import IDeserializable, { BitmaskDeserializable, EnumDeserializable, NumberStringMap } from '../../Util/Deserialize';
import { Util } from "../../Util/Util";
import { BlockType } from '../BlockType';
import { BlockTypeEnum } from "../BlockTypeEnum";
import BaseBlock from './Base';
import { StructMap } from '../../Util/StructMap';

const flagsSetStructMap = {
    
    'unknownInt8_0x0000': {
        offset: 0x0000,
        type: 'readUInt8',
    },

    'unknownInt32_0x0001': {
        offset: 0x0001,
        type: 'readInt32LE',
    },

    'ID': {
        offset: 0x001D,
        type: 'readInt32LE',
    },

    'unknownInt32_0x002D': {
        offset: 0x002D,
        type: 'readInt32LE',
    },

    'unknownInt32_0x0031': {
        offset: 0x0031,
        type: 'readInt32LE',
    },
    
    'currentLocationID': {
        offset: 0x0039,
        type: 'readInt32LE',
    },

    'flagMap': {
        offset: 0x003D,
        length: 0x4B2,
    },
} as const;

const checkFlagsSetStructMap: StructMap = flagsSetStructMap;

export interface IFlagsSetBlock extends BlockType {
    type: BlockTypeEnum.FlagsSetBlock;
}

export default class FlagsSetBlock extends BaseBlock implements IFlagsSetBlock, IDeserializable {
    readonly type = BlockTypeEnum.FlagsSetBlock;

    _unknownInt8_0x0000 = 0;
    _unknownInt32_0x0001 = 0;

    ID = 0;
    
    _unknownInt32_0x002D = 0;
    _unknownInt32_0x0031 = 0;

    currentLocationID = 0;

    flagMap: number[] = [];

    constructor(base: BaseBlock) {
        super();
        this.flags = base.flags;
        this.rawData = base.rawData;
        this.rawDataBuffer = base.rawDataBuffer
        this.size = base.size;

        if (this.rawDataBuffer !== undefined) {
            this.deserializeFrom(this.rawDataBuffer);
        }
    }

    public deserializeFrom(buffer: Buffer): number {
        this._unknownInt8_0x0000 = buffer[flagsSetStructMap.unknownInt8_0x0000.type](flagsSetStructMap.unknownInt8_0x0000.offset);
        this._unknownInt32_0x0001 = buffer[flagsSetStructMap.unknownInt32_0x0001.type](flagsSetStructMap.unknownInt32_0x0001.offset);

        this.ID = buffer[flagsSetStructMap.ID.type](flagsSetStructMap.ID.offset);

        this._unknownInt32_0x002D = buffer[flagsSetStructMap.unknownInt32_0x002D.type](flagsSetStructMap.unknownInt32_0x002D.offset);
        this._unknownInt32_0x0031 = buffer[flagsSetStructMap.unknownInt32_0x0031.type](flagsSetStructMap.unknownInt32_0x0031.offset);

        this.currentLocationID = buffer[flagsSetStructMap.currentLocationID.type](flagsSetStructMap.currentLocationID.offset);
        
        this.flagMap = Util.deserializeUInt8Array(buffer, flagsSetStructMap.flagMap.offset, flagsSetStructMap.flagMap.length);

        return this.size;
    }
}
