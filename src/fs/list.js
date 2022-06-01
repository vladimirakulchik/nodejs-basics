import { readdir } from 'fs';
import { URL } from 'url';

export const list = async () => {
    const folder = getFilePath('./files');
    const options = {
        encoding: 'utf8',
        withFileTypes: true,
    };

    readdir(folder, options, (err, files) => {
        if (err && 'ENOENT' === err.code) {
            throw new Error('FS operation failed');
        }

        const fileNames = files
            .filter(item => item.isFile())
            .map(file => file.name);

        console.log(fileNames);
    });
};

const getFilePath = (fileName) => {
    return new URL(fileName, import.meta.url).pathname;
}

list();
