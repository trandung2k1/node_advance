import express from 'express';
import { Worker } from 'worker_threads';
const port = 4000;
const app = express();
app.get('/non-blocking', (req, res) => {
    return res.send('Non blocking');
});

// 21.71s
app.get('/blocking', (req, res) => {
    const worker = new Worker('./worker.js');
    worker.on('message', (data) => {
        return res.status(200).send(`Result: ${data}`);
    });
    worker.on('error', (err) => {
        return res.status(200).send(`Error: ${err.message}`);
    });
    //! blocking all request after response successful
    // let total = 0;
    // for (let i = 0; i < 20_000_000_000; i++) {
    //     total++;
    // }
    // return res.status(200).send(`Result: ${total}`);
});
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
