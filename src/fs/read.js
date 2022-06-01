import { readFile } from 'fs';
import { URL } from 'url';

export const read = async () => {
    const filename = getFilePath('./files/fileToRead.txt');

    readFile(filename, 'utf8', (err, data) => {
        if (err && 'ENOENT' === err.code) {
            throw new Error('FS operation failed');
        }

        console.log(data);
    });
};

const getFilePath = (fileName) => {
    return new URL(fileName, import.meta.url).pathname;
}

read();
