import { BlockType } from '../BlockType';
import { BlockTypeEnum } from "../BlockTypeEnum";
import BaseBlock from './Base';

export interface IEndBlock extends BlockType {
    type: BlockTypeEnum.EndBlock;
}

export default class EndBlock extends BaseBlock implements IEndBlock {
    readonly type = BlockTypeEnum.EndBlock;

    constructor(base: BaseBlock) {
        super();
        this.flags = base.flags;
        this.rawData = base.rawData;
        this.rawDataBuffer = base.rawDataBuffer
        this.size = base.size;
    }
}
