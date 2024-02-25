import { Util } from '../Util/Util';

type SaveNameData = {
    name: string;
    level: string;
};

export const ParseSaveNameData = (buf: Buffer): SaveNameData => {
    return {
        name: Util.deserializeString(buf, 0, 0x18),
        level: Util.deserializeString(buf, 0x18, 0x8),
    };
};