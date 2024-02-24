import IDeserializable, { BitmaskDeserializable, EnumDeserializable } from '../../Util/Deserialize';
import { Util } from "../../Util/Util";
import { BlockType } from '../BlockType';
import { BlockTypeEnum } from "../BlockTypeEnum";
import BaseBlock from './Base';
import { BufferReadFuncToTypeMap, StructMap } from '../../Util/StructMap';
import { MaterialEnumType, MaterialEnum } from './Enums/MaterialEnumType';
import { GenderEnumType, GenderEnum } from './Enums/GenderEnumType';
import { RaceEnumType, RaceEnum } from './Enums/RaceEnumType';
import { ArmorEnumType, ArmorEnum } from './Enums/ArmorEnumType';
import { WeaponBitmaskType, WeaponBitmask } from './Enums/WeaponBitmaskType';
import { ElementalBitmaskType, ElementalBitmask } from './Enums/ElementalBitmaskType';

const creatureStructMap = {
    'unkByte0x0000': {
        offset: 0x0000,
        type: 'readUInt8',
    },

    'pauseYaw': {
        offset: 0x0001,
        type: 'readUInt16LE',
    },

    'rotation': {
        offset: 0x0003,
        type: 'readUInt16LE',
    },

    'z': {
        offset: 0x0007,
        type: 'readFloatLE',
    },
    'y': {
        offset: 0x000B,
        type: 'readFloatLE',
    },
    'x': {
        offset: 0x000F,
        type: 'readFloatLE',
    },
    'ID': {
        offset: 0x001D,
        type: 'readUInt32LE',
    },

    'name': {
        offset: 0x003D,
        length: 0x0020 /* 32 */,
    },

    'strength': {
        offset: 0x005D,
        type: 'readUInt32LE',
    },
    'intelligence': {
        offset: 0x0061,
        type: 'readUInt32LE',
    },
    'willpower': {
        offset: 0x0065,
        type: 'readUInt32LE',
    },
    'agility': {
        offset: 0x0069,
        type: 'readUInt32LE',
    },
    'endurance': {
        offset: 0x006D,
        type: 'readUInt32LE',
    },
    'personality': {
        offset: 0x0071,
        type: 'readUInt32LE',
    },
    'speed': {
        offset: 0x0075,
        type: 'readUInt32LE',
    },
    'luck': {
        offset: 0x0079,
        type: 'readUInt32LE',
    },

    'normalStrength': {
        offset: 0x007D,
        type: 'readUInt32LE',
    },
    'normalIntelligence': {
        offset: 0x0081,
        type: 'readUInt32LE',
    },
    'normalWillpower': {
        offset: 0x0085,
        type: 'readUInt32LE',
    },
    'normalAgility': {
        offset: 0x0089,
        type: 'readUInt32LE',
    },
    'normalEndurance': {
        offset: 0x008D,
        type: 'readUInt32LE',
    },
    'normalPersonality': {
        offset: 0x0091,
        type: 'readUInt32LE',
    },
    'normalSpeed': {
        offset: 0x0095,
        type: 'readUInt32LE',
    },
    'normalLuck': {
        offset: 0x0099,
        type: 'readUInt32LE',
    },

    'currentSP': {
        offset: 0x009D,
        type: 'readInt16LE',
    },
    'maxSP': {
        offset: 0x009F,
        type: 'readInt16LE',
    },
    'normalMaxSP': {
        offset: 0x00A1,
        type: 'readInt16LE',
    },

    'currentWounds': {
        offset: 0x00A3,
        type: 'readUInt32LE',
    },
    'maxWounds': {
        offset: 0x00A7,
        type: 'readUInt32LE',
    },
    'normalMaxWounds': {
        offset: 0x00AB,
        type: 'readUInt32LE',
    },

    'medical': {
        offset: 0x00AF,
        length: 0x000C,
    },
    'jumping': {
        offset: 0x00BB,
        length: 0x000C,
    },
    'lockpicking': {
        offset: 0x00C7,
        length: 0x000C,
    },
    'stealth': {
        offset: 0x00D3,
        length: 0x000C,
    },
    'swimming': {
        offset: 0x00DF,
        length: 0x000C,
    },
    'backstabbing': {
        offset: 0x00EB,
        length: 0x000C,
    },
    'dodging': {
        offset: 0x00F7,
        length: 0x000C,
    },
    'running': {
        offset: 0x0103,
        length: 0x000C,
    },
    'destruction': {
        offset: 0x010F,
        length: 0x000C,
    },
    'restoration': {
        offset: 0x011B,
        length: 0x000C,
    },
    'illusion': {
        offset: 0x0127,
        length: 0x000C,
    },
    'alteration': {
        offset: 0x0133,
        length: 0x000C,
    },
    'thaumaturgy': {
        offset: 0x013F,
        length: 0x000C,
    },
    'mysticism': {
        offset: 0x014B,
        length: 0x000C,
    },
    'shortBlade': {
        offset: 0x0157,
        length: 0x000C,
    },
    'longBlade': {
        offset: 0x0163,
        length: 0x000C,
    },
    'handToHand': {
        offset: 0x016F,
        length: 0x000C,
    },
    'axe': {
        offset: 0x017B,
        length: 0x000C,
    },
    'blunt': {
        offset: 0x0187,
        length: 0x000C,
    },
    'missile': {
        offset: 0x0193,
        length: 0x000C,
    },
    'criticalStrike': {
        offset: 0x019F,
        length: 0x000C,
    },

    'unknown0x01AB': {
        offset: 0x01AB,
        length: 0x0C /* 12 */,
    },

    'className': {
        offset: 0x01B7,
        length: 0x16 /* 22 */,
    },

    'unknown0x01CD': {
        offset: 0x01CD,
        length: 0x02 /* 2 */,
    },

    'resistance': {
        offset: 0x01CF,
    },
    'immunity': {
        offset: 0x01D0,
    },
    'acuteHearing': {
        offset: 0x01D1,
        type: 'readUInt8',
    },
    'spellAbsorption': {
        offset: 0x01D2,
        type: 'readUInt8',
    },
    'rapidHealing': {
        offset: 0x01D3,
        type: 'readUInt8',
    },
    'regenerateHealth': {
        offset: 0x01D4,
        type: 'readUInt8',
    },
    'regenerateSP': {
        offset: 0x01D5,
        type: 'readUInt8',
    },
    'athleticism': {
        offset: 0x01D6,
        type: 'readUInt8',
    },
    'unknown0x01D7': {
        offset: 0x01D7,
        type: 'readUInt8',
    },
    'spellPointMultiplier': {
        offset: 0x01D8,
        type: 'readInt8',
    },

    'unknown0x01D9': {
        offset: 0x01D9,
        length: 0x02 /* 2 */,
    },

    'adrenalineRush': {
        offset: 0x01DB,
        type: 'readUInt8',
    },

    'lowTolerance': {
        offset: 0x01DC,
    },
    'criticalWeakness': {
        offset: 0x01DD,
    },

    'regenerateSP2': {
        offset: 0x01DE,
        type: 'readUInt8',
    },

    'forbiddenWeapon': {
        offset: 0x01DF,
    },

    'forbiddenArmor': {
        offset: 0x01E0,
    },

    'unknown0x01E1': {
        offset: 0x01E1,
        type: 'readUInt8',
    },

    'forbiddenMaterial': {
        offset: 0x01E2,
    },

    'unknown0x01E3': {
        offset: 0x01E3,
        length: 0x0C /* 12 */,
    },

    'className2': {
        offset: 0x01EF,
        length: 0x16 /* 22 */,
    },

    'unknown0x0205': {
        offset: 0x0205,
        length: 0x0B /* 11 */,
    },

    'spellPointMultiplier2': {
        offset: 0x0210,
        type: 'readInt8',
    },

    'unknown0x0211': {
        offset: 0x0211,
        length: 0x07 /* 7 */,
    },

    'forbiddenArmor2': {
        offset: 0x0218,
    },

    'unknown0x0219': {
        offset: 0x0219,
        type: 'readUInt8',
    },

    'forbiddenMaterial2': {
        offset: 0x021A,
    },

    'unknown0x021B': {
        offset: 0x021B,
        length: 0x48 /* 72 */,
    },

    'gender': {
        offset: 0x0263,
    },

    'unknown0x0264': {
        offset: 0x0264,
        length: 0x17 /* 23 */,
    },

    'hairPictureNumber': {
        offset: 0x027B,
        type: 'readUInt8',
    },
    'mouthPictureNumber': {
        offset: 0x027C,
        type: 'readUInt8',
    },
    'eyePictureNumber': {
        offset: 0x027D,
        type: 'readUInt8',
    },

    'unknown0x027E': {
        offset: 0x027E,
        length: 0x1C /* 28 */,
    },

    'race': {
        offset: 0x029A,
    },

    'yaw': {
        offset: 0x02D8,
        type: 'readUInt16LE',
    },
} as const;

const checkCreatureStructMap: StructMap = creatureStructMap;

export interface ICreatureBlock extends BlockType {
    type: BlockTypeEnum.CreatureBlock;
}

export class CreatureSkillSegment implements IDeserializable {
    value = 0;
    count = 0;
    normal = 0;

    public deserializeFrom(buffer: Buffer) {
        let offset = 0;
        this.value = buffer.readInt32LE(0);
        this.count = buffer.readInt32LE(4);
        this.normal = buffer.readInt32LE(8);
        return offset;
    }

    public toString(): string {
        return JSON.stringify(this);
    }
}

export default class CreatureBlock extends BaseBlock implements ICreatureBlock, IDeserializable {
    readonly type = BlockTypeEnum.CreatureBlock;

    unkByte0x0000 = 0;

    pauseYaw = 0;
    rotation = 0;

    z = 0;
    y = 0;
    x = 0;

    ID = 0;

    name = '';

    strength = 0;
    intelligence = 0;
    willpower = 0;
    agility = 0;
    endurance = 0;
    personality = 0;
    speed = 0;
    luck = 0;

    normalStrength = 0;
    normalIntelligence = 0;
    normalWillpower = 0;
    normalAgility = 0;
    normalEndurance = 0;
    normalPersonality = 0;
    normalSpeed = 0;
    normalLuck = 0;

    currentSP = 0;
    maxSP = 0;
    normalMaxSP = 0;

    currentWounds = 0;
    maxWounds = 0;
    normalMaxWounds = 0;

    medical = new CreatureSkillSegment();
    jumping = new CreatureSkillSegment();
    lockpicking = new CreatureSkillSegment();
    stealth = new CreatureSkillSegment();
    swimming = new CreatureSkillSegment();
    backstabbing = new CreatureSkillSegment();
    dodging = new CreatureSkillSegment();
    running = new CreatureSkillSegment();
    destruction = new CreatureSkillSegment();
    restoration = new CreatureSkillSegment();
    illusion = new CreatureSkillSegment();
    alteration = new CreatureSkillSegment();
    thaumaturgy = new CreatureSkillSegment();
    mysticism = new CreatureSkillSegment();
    shortBlade = new CreatureSkillSegment();
    longBlade = new CreatureSkillSegment();
    handToHand = new CreatureSkillSegment();
    axe = new CreatureSkillSegment();
    blunt = new CreatureSkillSegment();
    missile = new CreatureSkillSegment();
    criticalStrike = new CreatureSkillSegment();

    className = '';

    resistance = new BitmaskDeserializable<ElementalBitmaskType>(ElementalBitmask);
    immunity = new BitmaskDeserializable<ElementalBitmaskType>(ElementalBitmask);

    acuteHearing = false;
    spellAbsorption = false;
    rapidHealing = false;
    regenerateHealth = false;
    regenerateSP = false;
    athleticism = false;

    spellPointMultiplier = 0;

    adrenalineRush = false;

    lowTolerance = new BitmaskDeserializable<ElementalBitmaskType>(ElementalBitmask);
    criticalWeakness = new BitmaskDeserializable<ElementalBitmaskType>(ElementalBitmask);

    regenerateSP2 = false;

    forbiddenWeapon = new BitmaskDeserializable<WeaponBitmaskType>(WeaponBitmask);

    forbiddenArmor = new EnumDeserializable<ArmorEnumType>(ArmorEnum);

    forbiddenMaterial = new EnumDeserializable<MaterialEnumType>(MaterialEnum);

    className2 = '';

    spellPointMultiplier2 = 0;

    forbiddenArmor2 = new EnumDeserializable<ArmorEnumType>(ArmorEnum);

    forbiddenMaterial2 = new EnumDeserializable<MaterialEnumType>(MaterialEnum);

    gender = new EnumDeserializable<GenderEnumType>(GenderEnum);

    hairPictureNumber = 0;
    mouthPictureNumber = 0;
    eyePictureNumber = 0;

    race = new EnumDeserializable<RaceEnumType>(RaceEnum);

    yaw = 0;

    constructor(base: BaseBlock) {
        super();
        this.flags = base.flags;
        this.rawData = base.rawData;
        this.rawDataBuffer = base.rawDataBuffer
        this.size = base.size;

        if (this.rawDataBuffer !== undefined) {
            this.deserializeFrom(this.rawDataBuffer);
        }
    }

    public deserializeFrom(buffer: Buffer): number {
        this.unkByte0x0000 = buffer[creatureStructMap.unkByte0x0000.type](creatureStructMap.unkByte0x0000.offset);

        this.pauseYaw = buffer[creatureStructMap.pauseYaw.type](creatureStructMap.pauseYaw.offset);
        this.rotation = buffer[creatureStructMap.rotation.type](creatureStructMap.rotation.offset);
        
        this.z = buffer[creatureStructMap.z.type](creatureStructMap.z.offset);
        this.y = buffer[creatureStructMap.y.type](creatureStructMap.y.offset);
        this.x = buffer[creatureStructMap.x.type](creatureStructMap.x.offset);

        this.ID = buffer[creatureStructMap.ID.type](creatureStructMap.ID.offset);
        
        this.name = Util.deserializeString(buffer, creatureStructMap.name.offset, creatureStructMap.name.length);

        this.strength = buffer[creatureStructMap.strength.type](creatureStructMap.strength.offset);
        this.intelligence = buffer[creatureStructMap.intelligence.type](creatureStructMap.intelligence.offset);
        this.willpower = buffer[creatureStructMap.willpower.type](creatureStructMap.willpower.offset);
        this.agility = buffer[creatureStructMap.agility.type](creatureStructMap.agility.offset);
        this.endurance = buffer[creatureStructMap.endurance.type](creatureStructMap.endurance.offset);
        this.personality = buffer[creatureStructMap.personality.type](creatureStructMap.personality.offset);
        this.speed = buffer[creatureStructMap.speed.type](creatureStructMap.speed.offset);
        this.luck = buffer[creatureStructMap.luck.type](creatureStructMap.luck.offset);

        this.normalStrength = buffer[creatureStructMap.normalStrength.type](creatureStructMap.normalStrength.offset);
        this.normalIntelligence = buffer[creatureStructMap.normalIntelligence.type](creatureStructMap.normalIntelligence.offset);
        this.normalWillpower = buffer[creatureStructMap.normalWillpower.type](creatureStructMap.normalWillpower.offset);
        this.normalAgility = buffer[creatureStructMap.normalAgility.type](creatureStructMap.normalAgility.offset);
        this.normalEndurance = buffer[creatureStructMap.normalEndurance.type](creatureStructMap.normalEndurance.offset);
        this.normalPersonality = buffer[creatureStructMap.normalPersonality.type](creatureStructMap.normalPersonality.offset);
        this.normalSpeed = buffer[creatureStructMap.normalSpeed.type](creatureStructMap.normalSpeed.offset);
        this.normalLuck = buffer[creatureStructMap.normalLuck.type](creatureStructMap.normalLuck.offset);

        this.currentSP = buffer[creatureStructMap.currentSP.type](creatureStructMap.currentSP.offset);
        this.maxSP = buffer[creatureStructMap.maxSP.type](creatureStructMap.maxSP.offset);
        this.normalMaxSP = buffer[creatureStructMap.normalMaxSP.type](creatureStructMap.normalMaxSP.offset);

        this.currentWounds = buffer[creatureStructMap.currentWounds.type](creatureStructMap.currentWounds.offset);
        this.maxWounds = buffer[creatureStructMap.maxWounds.type](creatureStructMap.maxWounds.offset);
        this.normalMaxWounds = buffer[creatureStructMap.normalMaxWounds.type](creatureStructMap.normalMaxWounds.offset);

        this.medical = new CreatureSkillSegment(); this.medical.deserializeFrom(buffer.subarray(creatureStructMap.medical.offset, creatureStructMap.medical.offset + creatureStructMap.medical.length));
        this.jumping = new CreatureSkillSegment(); this.jumping.deserializeFrom(buffer.subarray(creatureStructMap.jumping.offset, creatureStructMap.jumping.offset + creatureStructMap.jumping.length));
        this.lockpicking = new CreatureSkillSegment(); this.lockpicking.deserializeFrom(buffer.subarray(creatureStructMap.lockpicking.offset, creatureStructMap.lockpicking.offset + creatureStructMap.lockpicking.length));
        this.stealth = new CreatureSkillSegment(); this.stealth.deserializeFrom(buffer.subarray(creatureStructMap.stealth.offset, creatureStructMap.stealth.offset + creatureStructMap.stealth.length));
        this.swimming = new CreatureSkillSegment(); this.swimming.deserializeFrom(buffer.subarray(creatureStructMap.swimming.offset, creatureStructMap.swimming.offset + creatureStructMap.swimming.length));
        this.backstabbing = new CreatureSkillSegment(); this.backstabbing.deserializeFrom(buffer.subarray(creatureStructMap.backstabbing.offset, creatureStructMap.backstabbing.offset + creatureStructMap.backstabbing.length));
        this.dodging = new CreatureSkillSegment(); this.dodging.deserializeFrom(buffer.subarray(creatureStructMap.dodging.offset, creatureStructMap.dodging.offset + creatureStructMap.dodging.length));
        this.running = new CreatureSkillSegment(); this.running.deserializeFrom(buffer.subarray(creatureStructMap.running.offset, creatureStructMap.running.offset + creatureStructMap.running.length));
        this.destruction = new CreatureSkillSegment(); this.destruction.deserializeFrom(buffer.subarray(creatureStructMap.destruction.offset, creatureStructMap.destruction.offset + creatureStructMap.destruction.length));
        this.restoration = new CreatureSkillSegment(); this.restoration.deserializeFrom(buffer.subarray(creatureStructMap.restoration.offset, creatureStructMap.restoration.offset + creatureStructMap.restoration.length));
        this.illusion = new CreatureSkillSegment(); this.illusion.deserializeFrom(buffer.subarray(creatureStructMap.illusion.offset, creatureStructMap.illusion.offset + creatureStructMap.illusion.length));
        this.alteration = new CreatureSkillSegment(); this.alteration.deserializeFrom(buffer.subarray(creatureStructMap.alteration.offset, creatureStructMap.alteration.offset + creatureStructMap.alteration.length));
        this.thaumaturgy = new CreatureSkillSegment(); this.thaumaturgy.deserializeFrom(buffer.subarray(creatureStructMap.thaumaturgy.offset, creatureStructMap.thaumaturgy.offset + creatureStructMap.thaumaturgy.length));
        this.mysticism = new CreatureSkillSegment(); this.mysticism.deserializeFrom(buffer.subarray(creatureStructMap.mysticism.offset, creatureStructMap.mysticism.offset + creatureStructMap.mysticism.length));
        this.shortBlade = new CreatureSkillSegment(); this.shortBlade.deserializeFrom(buffer.subarray(creatureStructMap.shortBlade.offset, creatureStructMap.shortBlade.offset + creatureStructMap.shortBlade.length));
        this.longBlade = new CreatureSkillSegment(); this.longBlade.deserializeFrom(buffer.subarray(creatureStructMap.longBlade.offset, creatureStructMap.longBlade.offset + creatureStructMap.longBlade.length));
        this.handToHand = new CreatureSkillSegment(); this.handToHand.deserializeFrom(buffer.subarray(creatureStructMap.handToHand.offset, creatureStructMap.handToHand.offset + creatureStructMap.handToHand.length));
        this.axe = new CreatureSkillSegment(); this.axe.deserializeFrom(buffer.subarray(creatureStructMap.axe.offset, creatureStructMap.axe.offset + creatureStructMap.axe.length));
        this.blunt = new CreatureSkillSegment(); this.blunt.deserializeFrom(buffer.subarray(creatureStructMap.blunt.offset, creatureStructMap.blunt.offset + creatureStructMap.blunt.length));
        this.missile = new CreatureSkillSegment(); this.missile.deserializeFrom(buffer.subarray(creatureStructMap.missile.offset, creatureStructMap.missile.offset + creatureStructMap.missile.length));
        this.criticalStrike = new CreatureSkillSegment(); this.criticalStrike.deserializeFrom(buffer.subarray(creatureStructMap.criticalStrike.offset, creatureStructMap.criticalStrike.offset + creatureStructMap.criticalStrike.length));

        this.className = Util.deserializeString(buffer, creatureStructMap.className.offset, creatureStructMap.className.length);

        this.resistance = new BitmaskDeserializable<ElementalBitmaskType>(ElementalBitmask); this.resistance.deserializeFrom(buffer.subarray(creatureStructMap.resistance.offset, creatureStructMap.resistance.offset + 1));
        this.immunity = new BitmaskDeserializable<ElementalBitmaskType>(ElementalBitmask); this.immunity.deserializeFrom(buffer.subarray(creatureStructMap.immunity.offset, creatureStructMap.immunity.offset + 1));
        this.acuteHearing = Util.readBoolean(buffer, creatureStructMap.acuteHearing.offset);
        this.spellAbsorption = Util.readBoolean(buffer, creatureStructMap.spellAbsorption.offset);
        this.rapidHealing = Util.readBoolean(buffer, creatureStructMap.rapidHealing.offset);
        this.regenerateHealth = Util.readBoolean(buffer, creatureStructMap.regenerateHealth.offset);
        this.regenerateSP = Util.readBoolean(buffer, creatureStructMap.regenerateSP.offset);
        this.athleticism = Util.readBoolean(buffer, creatureStructMap.athleticism.offset);
        this.spellPointMultiplier = buffer[creatureStructMap.spellPointMultiplier.type](creatureStructMap.spellPointMultiplier.offset);

        this.adrenalineRush = Util.readBoolean(buffer, creatureStructMap.adrenalineRush.offset);

        this.lowTolerance = new BitmaskDeserializable<ElementalBitmaskType>(ElementalBitmask); this.lowTolerance.deserializeFrom(buffer.subarray(creatureStructMap.lowTolerance.offset, creatureStructMap.lowTolerance.offset + 1));
        this.criticalWeakness = new BitmaskDeserializable<ElementalBitmaskType>(ElementalBitmask); this.criticalWeakness.deserializeFrom(buffer.subarray(creatureStructMap.criticalWeakness.offset, creatureStructMap.criticalWeakness.offset + 1));

        this.regenerateSP2 = Util.readBoolean(buffer, creatureStructMap.regenerateSP2.offset);

        this.forbiddenWeapon = new BitmaskDeserializable<WeaponBitmaskType>(WeaponBitmask); this.forbiddenWeapon.deserializeFrom(buffer.subarray(creatureStructMap.forbiddenWeapon.offset, creatureStructMap.forbiddenWeapon.offset + 1));

        this.forbiddenArmor = new EnumDeserializable<ArmorEnumType>(ArmorEnum); this.forbiddenArmor.deserializeFrom(buffer.subarray(creatureStructMap.forbiddenArmor.offset, creatureStructMap.forbiddenArmor.offset + 1));

        this.forbiddenMaterial = new EnumDeserializable<MaterialEnumType>(MaterialEnum); this.forbiddenMaterial.deserializeFrom(buffer.subarray(creatureStructMap.forbiddenMaterial.offset, creatureStructMap.forbiddenMaterial.offset + 1));

        this.className2 = Util.deserializeString(buffer, creatureStructMap.className2.offset, creatureStructMap.className2.length);

        this.spellPointMultiplier2 = buffer[creatureStructMap.spellPointMultiplier2.type](creatureStructMap.spellPointMultiplier2.offset);

        this.forbiddenArmor2 = new EnumDeserializable<ArmorEnumType>(ArmorEnum); this.forbiddenArmor2.deserializeFrom(buffer.subarray(creatureStructMap.forbiddenArmor2.offset, creatureStructMap.forbiddenArmor2.offset + 1));

        this.forbiddenMaterial2 = new EnumDeserializable<MaterialEnumType>(MaterialEnum); this.forbiddenMaterial2.deserializeFrom(buffer.subarray(creatureStructMap.forbiddenMaterial2.offset, creatureStructMap.forbiddenMaterial2.offset + 1));

        this.gender = new EnumDeserializable<GenderEnumType>(GenderEnum); this.gender.deserializeFrom(buffer.subarray(creatureStructMap.gender.offset, creatureStructMap.gender.offset + 1));

        this.hairPictureNumber = buffer[creatureStructMap.hairPictureNumber.type](creatureStructMap.hairPictureNumber.offset);
        this.mouthPictureNumber = buffer[creatureStructMap.mouthPictureNumber.type](creatureStructMap.mouthPictureNumber.offset);
        this.eyePictureNumber = buffer[creatureStructMap.eyePictureNumber.type](creatureStructMap.eyePictureNumber.offset);

        this.race = new EnumDeserializable<RaceEnumType>(RaceEnum); this.race.deserializeFrom(buffer.subarray(creatureStructMap.race.offset, creatureStructMap.race.offset + 1));

        this.yaw = buffer[creatureStructMap.yaw.type](creatureStructMap.yaw.offset);

        return this.size;
    }
}
