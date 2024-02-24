import { AnyBlock } from "./BlockTypeMappings";
import BaseBlock from './Block/Base';
import EndBlock from './Block/End';
import SkipBlock from './Block/Skip';
import CreatureBlock from './Block/Creature';
import IDeserializable from '../Util/Deserialize';
import { SizeTypeEnum } from './SizeTypeEnum';
import ItemBlock from "./Block/Item";
import SpellBlock from "./Block/Spell";
import Unknown1Block from "./Block/Unknown1";
import Unknown2Block from "./Block/Unknown2";
import WorldObjectBlock from "./Block/WorldObject";
import FlagsSetBlock from "./Block/FlagsSet";
import { BlockTypeEnum } from "./BlockTypeEnum";
import { Util } from "../Util/Util";

export default class SaveTree implements IDeserializable {
    blocks: AnyBlock[] = [];

    deserializeFrom(buffer: Buffer): number {
        let offset = 0;

        do {
            try {
                const baseType = new BaseBlock();
                const baseTypeLength = baseType.deserializeFrom(buffer.subarray(offset));
                const logstr = `offset 0x${offset.toString(16)}, length 0x${baseType.size.toString(16)}`;
                offset += baseTypeLength;
                let block: AnyBlock;
                switch (baseType.size) {
                    case SizeTypeEnum.Creature:
                        block = new CreatureBlock(baseType);
                        this.blocks.push(block);
                        break;
                    case SizeTypeEnum.FlagsSet:
                        block = new FlagsSetBlock(baseType);
                        this.blocks.push(block);
                        break;
                    case SizeTypeEnum.Item:
                        block = new ItemBlock(baseType);
                        this.blocks.push(block);
                        break;
                    case SizeTypeEnum.Spell:
                        block = new SpellBlock(baseType);
                        this.blocks.push(block);
                        break;
                    case SizeTypeEnum.WorldObject:
                        block = new WorldObjectBlock(baseType);
                        this.blocks.push(block);
                        break;
                    case SizeTypeEnum.Unknown2:
                        block = new Unknown2Block(baseType);
                        this.blocks.push(block);
                        break;
                    case SizeTypeEnum.Unknown1:
                        block = new Unknown1Block(baseType);
                        this.blocks.push(block);
                        break;
                    default:
                        if (baseType.type === BlockTypeEnum.EndBlock) {
                            block = new EndBlock(baseType);
                            this.blocks.push(block);
                        } else {
                            console.log(`Unmapped size ${baseType.size}`);
                            block = new SkipBlock(baseType);
                            this.blocks.push(block);
                        }
                        break;
                }
                //console.log(`reading block type ${BlockTypeEnum[block.type]}, ${logstr}, data ${Util.strippedStringify(block, 0)}`);
            } catch (e) {
                console.error(e);
                return offset;
            }
        } while (offset < buffer.byteLength);

        return offset;
    }
}