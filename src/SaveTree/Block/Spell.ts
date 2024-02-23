import { BlockType } from '../BlockType';
import { BlockTypeEnum } from "../BlockTypeEnum";
import BaseBlock from './Base';

export interface ISpellBlock extends BlockType {
    type: BlockTypeEnum.SpellBlock;
}

export default class SpellBlock extends BaseBlock implements ISpellBlock {
    readonly type = BlockTypeEnum.SpellBlock;

    constructor(base: BaseBlock) {
        super();
        this.flags = base.flags;
        this.rawData = base.rawData;
        this.rawDataBuffer = base.rawDataBuffer
        this.size = base.size;
    }
}
