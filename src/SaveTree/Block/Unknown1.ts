import { BlockType } from '../BlockType';
import { BlockTypeEnum } from "../BlockTypeEnum";
import BaseBlock from './Base';

export interface IUnknown1Block extends BlockType {
    type: BlockTypeEnum.Unknown1Block;
}

export default class Unknown1Block extends BaseBlock implements IUnknown1Block {
    readonly type = BlockTypeEnum.Unknown1Block;

    constructor(base: BaseBlock) {
        super();
        this.flags = base.flags;
        this.rawData = base.rawData;
        this.rawDataBuffer = base.rawDataBuffer
        this.size = base.size;
    }
}
