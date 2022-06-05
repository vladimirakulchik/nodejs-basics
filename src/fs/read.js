import { readFile } from 'fs';
import { resolve, dirname } from 'path';
import { argv } from 'process';

export const read = async () => {
    const filePath = getFilePath('./files/fileToRead.txt');

    readFile(filePath, 'utf8', (err, data) => {
        if (err && 'ENOENT' === err.code) {
            throw new Error('FS operation failed');
        }

        console.log(data);
    });
};

const getFilePath = (fileName) => {
    const folder = dirname(argv[1]);

    return resolve(folder, fileName);
};

read();
