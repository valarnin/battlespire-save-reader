import SaveTree from './SaveTree/SaveTree';
import fs from 'fs';
import { argv } from 'process';
import { Util } from './Util/Util';

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
console.log(Util.strippedStringify(parsed));
