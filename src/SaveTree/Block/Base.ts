import { BlockType } from '../BlockType';
import { BlockTypeEnum } from "../BlockTypeEnum";
import IDeserializable from '../../Util/Deserialize';

export interface IBaseBlock extends IDeserializable, BlockType { }

export default class BaseBlock implements IBaseBlock {
    type = BlockTypeEnum.NONE;
    flags = 0;
    size = 0;
    rawDataBuffer?: Buffer = undefined;
    rawData?: number[] = undefined;

    public deserializeFrom(buffer: Buffer) {
        let offset = 0;
        this.flags = buffer.readUInt32LE(offset); offset += 4;
        this.size = buffer.readUInt32LE(offset); offset += 4;
        if (this.size === 0) {
            this.size = (buffer.byteLength - offset);
            this.type = BlockTypeEnum.EndBlock;
        }
        this.rawDataBuffer = buffer.subarray(offset, offset + this.size); offset += this.size;
        // -4 to offset to account for 4 bytes for `size`
        offset -= 4;
        this.rawData = [];
        for (let i = 0; i < this.size; ++i) {
            this.rawData[i] = this.rawDataBuffer.readUInt8(i);
        }

        if (this.type === BlockTypeEnum.EndBlock) offset += 4;
        return offset;
    }
}
