import { readFile } from 'fs/promises';
import { URL } from 'url';

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
    return new URL(fileName, import.meta.url).pathname;
}

console.log(await calculateHash());
