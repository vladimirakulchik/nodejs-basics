import { unlink } from 'fs';
import { resolve, dirname } from 'path';
import { argv } from 'process';

export const remove = async () => {
    const filePath = getFilePath('./files/fileToRemove.txt');

    unlink(filePath, (err) => {
        if (err && 'ENOENT' === err.code) {
            throw new Error('FS operation failed');
        }
    });
};

const getFilePath = (fileName) => {
    const folder = dirname(argv[1]);

    return resolve(folder, fileName);
}

remove();
