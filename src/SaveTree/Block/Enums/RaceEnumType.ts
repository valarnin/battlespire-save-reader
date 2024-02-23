import { NumberStringMap } from '../../../Util/Deserialize';

export const RaceEnum: NumberStringMap = {
    [-1]: 'None',
    0: 'Race0',
    1: 'Race1',
    2: 'Race2',
    3: 'Race3',
    4: 'Race4',
    5: 'Race5',
} as const;
export type RaceEnumType = typeof RaceEnum;
