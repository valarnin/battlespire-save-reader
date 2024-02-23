import { BlockType } from '../BlockType';
import { BlockTypeEnum } from "../BlockTypeEnum";
import BaseBlock from './Base';

export interface IUnknown2Block extends BlockType {
    type: BlockTypeEnum.Unknown2Block;
}

export default class Unknown2Block extends BaseBlock implements IUnknown2Block {
    readonly type = BlockTypeEnum.Unknown2Block;

    constructor(base: BaseBlock) {
        super();
        this.flags = base.flags;
        this.rawData = base.rawData;
        this.rawDataBuffer = base.rawDataBuffer
        this.size = base.size;
    }
}
