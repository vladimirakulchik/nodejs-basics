import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream';
import { resolve, dirname } from 'path';
import { argv } from 'process';

export const decompress = async () => {
    const srcFile = getFilePath('./files/archive.gz');
    const destFile = getFilePath('./files/fileToCompress.txt');

    const input = createReadStream(srcFile);
    const output = createWriteStream(destFile);
    const gunzip = createGunzip();

    pipeline(
        input,
        gunzip,
        output,
        (err) => {
            if (err) {
              console.error('Pipeline failed.', err);
            }
        }
    );
};

const getFilePath = (fileName) => {
    const folder = dirname(argv[1]);

    return resolve(folder, fileName);
};

decompress();
