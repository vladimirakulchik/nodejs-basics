import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { resolve, dirname } from 'path';
import { argv } from 'process';

export const compress = async () => {
    const srcFile = getFilePath('./files/fileToCompress.txt');
    const destFile = getFilePath('./files/archive.gz');

    const input = createReadStream(srcFile, 'utf-8');
    const output = createWriteStream(destFile);
    const gzip = createGzip();

    pipeline(
        input,
        gzip,
        output,
        (err) => {
            if (err) {
              console.error(err);
            }
        }
    );
};

const getFilePath = (fileName) => {
    const folder = dirname(argv[1]);

    return resolve(folder, fileName);
}

compress();
