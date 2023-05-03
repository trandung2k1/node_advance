import express from 'express';
import { Worker } from 'worker_threads';
const port = 4000;
const THREAD_COUNT = 4;
const app = express();
app.get('/non-blocking', (req, res) => {
    return res.send('Non blocking');
});
function createWorker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./four-workers.js', {
            workerData: {
                thread_count: THREAD_COUNT,
            },
        });
        worker.on('message', (data) => {
            resolve(data);
        });
        worker.on('error', (err) => {
            reject(err);
        });
    });
}
app.get('/blocking', async (req, res) => {
    const workerPromises = [];
    for (let i = 0; i < THREAD_COUNT; i++) {
        workerPromises.push(createWorker());
    }
    const thread_results = await Promise.all(workerPromises);
    const total = thread_results[0] + thread_results[1] + thread_results[2] + thread_results[3];
    return res.status(200).json(total);
});
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
