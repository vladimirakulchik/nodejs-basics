import { copyFile, mkdir, readdir } from 'fs';
import { URL } from 'url';

export const copy = async () => {
    const folder = './files';
    const newFolder = './files_copy';
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

const getFilePath = (folder, fileName) => {
    return new URL(
        folder + '/' + fileName, 
        import.meta.url
    ).pathname;
}

copy();
