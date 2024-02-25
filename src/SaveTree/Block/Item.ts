import IDeserializable, { BitmaskDeserializable, EnumDeserializable, NumberStringMap } from '../../Util/Deserialize';
import { Util } from "../../Util/Util";
import { BlockType } from '../BlockType';
import { BlockTypeEnum } from "../BlockTypeEnum";
import BaseBlock from './Base';
import { StructMap } from '../../Util/StructMap';
import { MaterialEnum, MaterialEnumType } from './Enums/MaterialEnumType';

const itemStructMap = {
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
    
    'currentLocationID': {
        offset: 0x0039,
        type: 'readInt32LE',
    },

    'name': {
        offset: 0x003D,
        length: 0x0020 /* 32 */,
    },
    'itemModelID': {
        offset: 0x0060,
        length: 0x0008,
    },

    'currentDurability': {
        offset: 0x0068,
        type: 'readInt32LE',
    },
    'maxDurability': {
        offset: 0x006C,
        type: 'readInt32LE',
    },
    'material': {
        offset: 0x0070,
        type: 'readInt16LE',
    },
    'weight': {
        offset: 0x0072,
        type: 'readInt16LE',
    },
    'count': {
        offset: 0x007B,
        type: 'readUInt32LE',
    },
    'nameExtension': {
        offset: 0x00F0,
        length: 0x0020 /* 32 */,
    },
} as const;

const checkItemStructMap: StructMap = itemStructMap;

export interface IItemBlock extends BlockType {
    type: BlockTypeEnum.ItemBlock;
}

export default class ItemBlock extends BaseBlock implements IItemBlock, IDeserializable {
    readonly type = BlockTypeEnum.ItemBlock;

    rotation = 0;

    z = 0;
    y = 0;
    x = 0;

    ID = 0;
    currentLocationID = 0;

    name = '';
    itemModelID = '';

    currentDurability = 0;
    maxDurability = 0;
    material = new EnumDeserializable<MaterialEnumType>(MaterialEnum);
    weight = 0;
    count = 0;
    
    nameExtension = '';

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
        this.rotation = buffer[itemStructMap.rotation.type](itemStructMap.rotation.offset);
        
        this.z = buffer[itemStructMap.z.type](itemStructMap.z.offset);
        this.y = buffer[itemStructMap.y.type](itemStructMap.y.offset);
        this.x = buffer[itemStructMap.x.type](itemStructMap.x.offset);

        this.ID = buffer[itemStructMap.ID.type](itemStructMap.ID.offset);
        this.currentLocationID = buffer[itemStructMap.currentLocationID.type](itemStructMap.currentLocationID.offset);

        this.name = Util.deserializeString(buffer, itemStructMap.name.offset, itemStructMap.name.length);
        this.name = this.name.split('"')[0];
        this.itemModelID = Util.deserializeString(buffer, itemStructMap.itemModelID.offset, itemStructMap.itemModelID.length);

        this.currentDurability = buffer[itemStructMap.currentDurability.type](itemStructMap.currentDurability.offset);
        this.maxDurability = buffer[itemStructMap.maxDurability.type](itemStructMap.maxDurability.offset);
        this.material = new EnumDeserializable<MaterialEnumType>(MaterialEnum); this.material.deserializeFrom(buffer.subarray(itemStructMap.material.offset, itemStructMap.material.offset + 1));
        this.weight = buffer[itemStructMap.weight.type](itemStructMap.weight.offset);
        this.count = buffer[itemStructMap.count.type](itemStructMap.count.offset);
        
        this.nameExtension = Util.deserializeString(buffer, itemStructMap.nameExtension.offset, itemStructMap.nameExtension.length);
        
        return this.size;
    }
}
