import { access, constants, rename as renameFile } from 'fs';
import { URL } from 'url';

export const rename = async () => {
    const oldPath = getFilePath('./files/wrongFilename.txt');
    const newPath = getFilePath('./files/properFilename.md');

    access(newPath, constants.F_OK, (err) => {
        if (!err) {
            throw new Error('FS operation failed');
        }

        renameFile(oldPath, newPath, (err) => {
            if (err && 'ENOENT' === err.code) {
                throw new Error('FS operation failed');
            }
        });
    });
};

const getFilePath = (fileName) => {
    return new URL(fileName, import.meta.url).pathname;
}

rename();
