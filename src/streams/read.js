import { createReadStream } from 'fs';
import { resolve, dirname } from 'path';
import { argv, stdout } from 'process';

export const read = async () => {
    const filePath = getFilePath('./files/fileToRead.txt');
    const input = createReadStream(filePath, 'utf-8');

    input.pipe(stdout);
};

const getFilePath = (fileName) => {
    const folder = dirname(argv[1]);

    return resolve(folder, fileName);
};

read();
