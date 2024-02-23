import { NumberStringMap } from '../../../Util/Deserialize';

export const GenderEnum: NumberStringMap = {
    [-1]: 'None',
    0: 'Male',
    8: 'Female',
} as const;
export type GenderEnumType = typeof GenderEnum;
