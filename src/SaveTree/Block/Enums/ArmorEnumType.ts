import { NumberStringMap } from '../../../Util/Deserialize';

export const ArmorEnum: NumberStringMap = {
    [-1]: 'None',
    0: 'Unarmored',
    1: 'Light',
    2: 'Medium',
    3: 'Heavy',
} as const;
export type ArmorEnumType = typeof ArmorEnum;
