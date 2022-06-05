import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';
import { cpus } from 'os';

const getFilePath = (fileName) => {
    const folder = dirname(fileURLToPath(import.meta.url));

    return resolve(folder, fileName);
};

const runWorker = (filePath, workerData) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(filePath, { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (0 !== code) {
                reject(new Error(`Exit code: ${code}`));
            }
        });
    });
};

export const performCalculations = async () => {
    const filePath = getFilePath('./worker.js');
    const workerCount = cpus().length;
    const workers = [];
    let workerData = 10;

    for (let i = 0; i < workerCount; i++) {
        workers.push(runWorker(filePath, workerData++));
    }

    return Promise.allSettled(workers).then((results) => {
        return results.map((result) => {
            if ('fulfilled' === result.status) {
                return {
                    status: 'resolved',
                    data: result.value,
                };
            }

            return {
                status: 'error',
                data: null,
            };
        })
    });
};

performCalculations().then((result) => {
    console.log(result);
});
