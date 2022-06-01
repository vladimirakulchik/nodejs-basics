import { unlink } from 'fs';
import { URL } from 'url';

export const remove = async () => {
    const filename = getFilePath('./files/fileToRemove.txt');

    unlink(filename, (err) => {
        if (err && 'ENOENT' === err.code) {
            throw new Error('FS operation failed');
        }
    });
};

const getFilePath = (fileName) => {
    return new URL(fileName, import.meta.url).pathname;
}

remove();
