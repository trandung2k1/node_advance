import express from 'express';
const port = 4000;
const app = express();
app.get('/heavy', (req, res) => {
    let total = 0;
    for (let i = 0; i < 50_000_000; i++) {
        total += i;
    }
    res.send(`The result of the CPU intensive task is ${total}\n`);
});
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
    console.log(`Worker pid = ${process.pid}`);
});
