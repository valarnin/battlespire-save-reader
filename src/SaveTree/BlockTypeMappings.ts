import CreatureBlock from "./Block/Creature";
import EndBlock from "./Block/End";
import BaseBlock from "./Block/Base";
import SkipBlock from "./Block/Skip";
import { BlockType } from "./BlockType";
import { BlockTypeEnum } from "./BlockTypeEnum";
import ItemBlock from "./Block/Item";
import SpellBlock from "./Block/Spell";
import Unknown1Block from "./Block/Unknown1";
import Unknown2Block from "./Block/Unknown2";
import WorldObjectBlock from "./Block/WorldObject";
import FlagsSetBlock from "./Block/FlagsSet";

export type AnyBlock = CreatureBlock | BaseBlock | SkipBlock;

export type BlockTypeEnumType = typeof BlockTypeEnum;

export const BlockTypeMap: {
    [key in keyof BlockTypeEnumType]: AnyBlock;
} = {
    'FlagsSetBlock': FlagsSetBlock.prototype,
    'ItemBlock': ItemBlock.prototype,
    'SpellBlock': SpellBlock.prototype,
    'WorldObjectBlock': WorldObjectBlock.prototype,
    'Unknown2Block': Unknown2Block.prototype,
    'Unknown1Block': Unknown1Block.prototype,
    'CreatureBlock': CreatureBlock.prototype,
    'EndBlock': EndBlock.prototype,
    'NONE': SkipBlock.prototype,
    'SkipBlock': SkipBlock.prototype,
} as const;

export const BlockTypeIDToBlockTypeMap: {
    [key in BlockTypeEnumType[keyof BlockTypeEnumType]]: BlockType;
} = {
    7: FlagsSetBlock.prototype,
    6: ItemBlock.prototype,
    5: SpellBlock.prototype,
    4: WorldObjectBlock.prototype,
    3: Unknown2Block.prototype,
    2: Unknown1Block.prototype,
    1: CreatureBlock.prototype,
    0: EndBlock.prototype,
    [-1]: SkipBlock.prototype,
    [-2]: SkipBlock.prototype,
} as const;
