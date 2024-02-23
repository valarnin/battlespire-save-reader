import { BlockTypeEnum } from "./BlockTypeEnum";

export type BlockType = {
    readonly type: BlockTypeEnum;
    flags: number;
    size: number;
};
