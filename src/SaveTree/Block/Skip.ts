import { BlockType } from '../BlockType';
import { BlockTypeEnum } from "../BlockTypeEnum";
import BaseBlock from './Base';

export interface ISkipBlock extends BlockType {
    type: BlockTypeEnum.SkipBlock;
}

export default class SkipBlock extends BaseBlock implements ISkipBlock {
    readonly type = BlockTypeEnum.SkipBlock;

    constructor(base: BaseBlock) {
        super();
        this.flags = base.flags;
        this.rawData = base.rawData;
        this.rawDataBuffer = base.rawDataBuffer
        this.size = base.size;

        console.log(`skipping flags ${this.flags}, size ${this.size}, length ${this.size}`);
    }
}
