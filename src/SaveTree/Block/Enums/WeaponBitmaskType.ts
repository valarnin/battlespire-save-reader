import { NumberStringMap } from '../../../Util/Deserialize';

export const WeaponBitmask: NumberStringMap = {
    1: 'Short',
    2: 'Long',
    4: 'Blunt',
    8: 'Axe',
    16: 'Missile',
} as const;
export type WeaponBitmaskType = typeof WeaponBitmask;
