import { writeFile } from 'fs';
import { URL } from 'url';

export const create = async () => {
    const filename = getFilePath('./files/fresh.txt');
    const data = 'I am fresh and young';

    writeFile(
        filename,
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
    return new URL(fileName, import.meta.url).pathname;
}

create();
