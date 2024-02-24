import SaveTree from '../SaveTree/SaveTree';
import fs from 'fs';
import { argv } from 'process';
import { Util } from '../Util/Util';
import { AnyBlock } from '../SaveTree/BlockTypeMappings';

let filePath: string | undefined = undefined;

for (const arg of argv) {
    if (arg.toLowerCase().endsWith('.dat')) {
        filePath = arg;
        break;
    }
}

if (filePath === undefined) {
    console.error('No valid file passed');
    process.exit(-1);
}

const file = fs.readFileSync(filePath);
const buffer = file.buffer;

const parsed = new SaveTree();
parsed.deserializeFrom(Buffer.from(buffer));
// For sanity's sake, apply some sorting before we dump it
const playerEntry = parsed.blocks.find(b => 'ID' in b ? b.ID === 50000 : false) as AnyBlock;
const blocks = parsed.blocks.slice(1).sort((b1, b2) => ('ID' in b1 && 'ID' in b2) ? b1.ID - b2.ID : 0);
parsed.blocks = [playerEntry, ...blocks];
console.log(Util.strippedStringify(parsed));
