import { access, constants, rename as renameFile } from 'fs';
import { resolve, dirname } from 'path';
import { argv } from 'process';

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
    const folder = dirname(argv[1]);

    return resolve(folder, fileName);
}

rename();
