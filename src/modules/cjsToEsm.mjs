// import objA from './files/a.json' assert { type: 'json' };
import { readFile } from 'fs/promises';
import { createServer as createServerHttp } from 'http';
import { release, version } from 'os';
import { sep, dirname } from 'path';
import { fileURLToPath } from 'url';
import './files/c.js';

const loadJson = async (fileName) => {
    return JSON.parse(
        await readFile(
            new URL(fileName, import.meta.url)
        )
    );
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const random = Math.random();

export const unknownObject = random > 0.5 
    ? await loadJson('./files/a.json')
    : await loadJson('./files/b.json');

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

export const createMyServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

// createMyServer.listen(8000);
