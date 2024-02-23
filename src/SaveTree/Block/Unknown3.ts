import { BlockType } from '../BlockType';
import { BlockTypeEnum } from "../BlockTypeEnum";
import BaseBlock from './Base';

export interface IUnknown3Block extends BlockType {
    type: BlockTypeEnum.Unknown3Block;
}

export default class Unknown3Block extends BaseBlock implements IUnknown3Block {
    readonly type = BlockTypeEnum.Unknown3Block;

    constructor(base: BaseBlock) {
        super();
        this.flags = base.flags;
        this.rawData = base.rawData;
        this.rawDataBuffer = base.rawDataBuffer
        this.size = base.size;
    }
}
