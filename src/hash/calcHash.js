import { readFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { argv } from 'process';

const { createHash } = await import('crypto');

export const calculateHash = async () => {
    const filename = getFilePath('./files/fileToCalculateHashFor.txt');

    return readFile(filename, 'utf-8')
        .then(data => {
            const hash = createHash('sha256').update(data);
            const hexValue = hash.digest('hex');

            return hexValue;
        }
    );
};

const getFilePath = (fileName) => {
    const folder = dirname(argv[1]);

    return resolve(folder, fileName);
}

console.log(await calculateHash());
