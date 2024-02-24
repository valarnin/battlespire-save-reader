import IDeserializable, { BitmaskDeserializable, EnumDeserializable, NumberStringMap } from '../../Util/Deserialize';
import { Util } from "../../Util/Util";
import { BlockType } from '../BlockType';
import { BlockTypeEnum } from "../BlockTypeEnum";
import BaseBlock from './Base';
import { StructMap } from '../../Util/StructMap';

const worldObjectStructMap = {
    'z': {
        offset: 0x0007,
        type: 'readFloatLE',
    },
    'y': {
        offset: 0x000B,
        type: 'readFloatLE',
    },
    'x': {
        offset: 0x000F,
        type: 'readFloatLE',
    },

    'rotation': {
        offset: 0x0003,
        type: 'readUInt16LE',
    },
    
    'ID': {
        offset: 0x001D,
        type: 'readInt32LE',
    },
} as const;

const checkWorldObjectStructMap: StructMap = worldObjectStructMap;

export interface IWorldObjectBlock extends BlockType {
    type: BlockTypeEnum.WorldObjectBlock;
}

export default class WorldObjectBlock extends BaseBlock implements IWorldObjectBlock, IDeserializable {
    readonly type = BlockTypeEnum.WorldObjectBlock;

    rotation = 0;

    z = 0;
    y = 0;
    x = 0;

    ID = 0;

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
        this.rotation = buffer[worldObjectStructMap.rotation.type](worldObjectStructMap.rotation.offset);
        
        this.z = buffer[worldObjectStructMap.z.type](worldObjectStructMap.z.offset);
        this.y = buffer[worldObjectStructMap.y.type](worldObjectStructMap.y.offset);
        this.x = buffer[worldObjectStructMap.x.type](worldObjectStructMap.x.offset);

        this.ID = buffer[worldObjectStructMap.ID.type](worldObjectStructMap.ID.offset);
        
        return this.size;
    }
}
