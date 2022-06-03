import { writeFile } from 'fs';
import { resolve, dirname } from 'path';
import { argv } from 'process';

export const create = async () => {
    const filePath = getFilePath('./files/fresh.txt');
    const data = 'I am fresh and young';

    writeFile(
        filePath,
        data,
        { flag: 'wx' },
        (err) => {
            if (err && 'EEXIST' === err.code) {
                throw new Error('FS operation failed');
            }
        }
    );
};

const getFilePath = (fileName) => {
    const folder = dirname(argv[1]);

    return resolve(folder, fileName);
}

create();
