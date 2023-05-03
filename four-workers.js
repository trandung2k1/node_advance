import { workerData, parentPort } from 'worker_threads';
let total = 0;
for (let i = 0; i < 20_000_000_000 / workerData.thread_count; i++) {
    total++;
}
parentPort.postMessage(total);
