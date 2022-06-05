import { fork } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const getFilePath = (fileName) => {
    const folder = dirname(fileURLToPath(import.meta.url));

    return resolve(folder, fileName);
};

export const spawnChildProcess = async (args) => {
    const filePath = getFilePath('./files/script.js');
    const childProcess = fork(filePath, args);

    childProcess.on('message', message => {
        console.log('PARENT got message:', message);
    });

    childProcess.send('IPC-channel test');
};

spawnChildProcess(['my', 'cli', 'agrs']);
