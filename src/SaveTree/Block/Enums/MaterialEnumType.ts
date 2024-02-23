import { NumberStringMap } from '../../../Util/Deserialize';

export const MaterialEnum: NumberStringMap = {
    [-1]: 'None',
    0: 'Iron',
    1: 'Steel',
    2: 'Silver',
    3: 'Elven',
    4: 'Dwarven',
    5: 'Mithril',
    6: 'Adamantium',
    7: 'Ebony',
    8: 'Orcish',
    9: 'Daedric',
} as const;
export type MaterialEnumType = typeof MaterialEnum;
