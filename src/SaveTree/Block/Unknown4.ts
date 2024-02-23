import { BlockType } from '../BlockType';
import { BlockTypeEnum } from "../BlockTypeEnum";
import BaseBlock from './Base';

export interface IUnknown4Block extends BlockType {
    type: BlockTypeEnum.Unknown4Block;
}

export default class Unknown4Block extends BaseBlock implements IUnknown4Block {
    readonly type = BlockTypeEnum.Unknown4Block;

    constructor(base: BaseBlock) {
        super();
        this.flags = base.flags;
        this.rawData = base.rawData;
        this.rawDataBuffer = base.rawDataBuffer
        this.size = base.size;
    }
}
