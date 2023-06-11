import express from 'express';
const port = 4000;
import os from 'os';
process.env.UV_THREADPOOL_SIZE = os.cpus().length;
const app = express();
app.get('/heavy', (req, res) => {
    let total = 0;
    for (let i = 0; i < 5_000_000_000; i++) {
        total += i;
    }
    res.send(`The result of the CPU intensive task is ${total}\n`);
});
app.get('/', (req, res) => {
    res.send(`Hi`);
});
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
    console.log(`Worker pid = ${process.pid}`);
});
