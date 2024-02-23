import { NumberStringMap } from '../../../Util/Deserialize';

export const ElementalBitmask: NumberStringMap = {
    1: 'Magic',
    2: 'Frost',
    4: 'Fire',
    8: 'Shock',
    16: 'Poison',
} as const;
export type ElementalBitmaskType = typeof ElementalBitmask;
