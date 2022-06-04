import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';

const getFilePath = (fileName) => {
    const folder = dirname(fileURLToPath(import.meta.url));

    return resolve(folder, fileName);
};

const runWorker = (filePath, workerData) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(filePath, { workerData });
        worker.on('message', (result) => {
            resolve(result);
        });
        worker.on('error', (err) => {
            reject(err);
        });
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
};

export const performCalculations = async () => {
    const filePath = getFilePath('./worker.js');

    // create array of runWorkers

    return Promise.all([
        runWorker(filePath, 10),
        runWorker(filePath, 11)
    ]).then(values => {
        return values;
    });
};

performCalculations().then((result) => {
    console.log('Result:', result);
}).catch((err) => {
    console.error(err)
});
