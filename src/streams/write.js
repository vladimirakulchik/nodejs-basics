import { createWriteStream } from 'fs';
import { resolve, dirname } from 'path';
import { argv, stdin } from 'process';

export const write = async () => {
    const filePath = getFilePath('./files/fileToWrite.txt');
    const output = createWriteStream(filePath);

    stdin.pipe(output);
};

const getFilePath = (fileName) => {
    const folder = dirname(argv[1]);

    return resolve(folder, fileName);
};

write();
