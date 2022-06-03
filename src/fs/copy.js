import { copyFile, mkdir, readdir } from 'fs';
import { resolve, dirname } from 'path';
import { argv } from 'process';

export const copy = async () => {
    const folder = getFolderPath('./files');
    const newFolder = getFolderPath('./files_copy');
    const options = {
        encoding: 'utf8',
        withFileTypes: true,
    };

    mkdir(newFolder, (err) => {
        if (err) {
            throw new Error('FS operation failed');
        }

        readdir(folder, options, (err, files) => {
            if (err && 'ENOENT' === err.code) {
                throw new Error('FS operation failed');
            }

            files.forEach((item) => {
                if (item.isFile()) {
                    const src = getFilePath(folder, item.name);
                    const dest = getFilePath(newFolder, item.name);

                    copyFile(src, dest, (err) => {
                        if (err) {
                            throw new Error('FS operation failed');
                        }
                    });
                }
            });
        });
    });
};

const getFolderPath = (folder) => {
    const dir = dirname(argv[1]);

    return resolve(dir, folder);
}

const getFilePath = (folder, fileName) => {
    const dir = dirname(argv[1]);

    return resolve(dir, folder, fileName);
}

copy();
