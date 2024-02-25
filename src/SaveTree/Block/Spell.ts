import IDeserializable, { BitmaskDeserializable, EnumDeserializable, NumberStringMap } from '../../Util/Deserialize';
import { Util } from "../../Util/Util";
import { BlockType } from '../BlockType';
import { BlockTypeEnum } from "../BlockTypeEnum";
import BaseBlock from './Base';
import { StructMap } from '../../Util/StructMap';

const spellStructMap = {
    
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
} as const;

const checkItemStructMap: StructMap = spellStructMap;

export interface ISpellBlock extends BlockType {
    type: BlockTypeEnum.SpellBlock;
}

export default class SpellBlock extends BaseBlock implements ISpellBlock, IDeserializable {
    readonly type = BlockTypeEnum.SpellBlock;

    ID = 0;
    currentLocationID = 0;

    name = '';

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
        this.ID = buffer[spellStructMap.ID.type](spellStructMap.ID.offset);
        this.currentLocationID = buffer[spellStructMap.currentLocationID.type](spellStructMap.currentLocationID.offset);

        this.name = Util.deserializeString(buffer, spellStructMap.name.offset, spellStructMap.name.length);

        return this.size;
    }
}
