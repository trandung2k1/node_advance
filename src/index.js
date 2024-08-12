import express from 'express';
const port = 4000;
import os from 'os';
import bcrypt from 'bcrypt';
process.env.UV_THREADPOOL_SIZE = os.cpus().length;
// process.env.UV_THREADPOOL_SIZE = 1;
const app = express();
app.get('/heavy', (req, res) => {
    let total = 0;
    for (let i = 0; i < 5_000_000_000; i++) {
        total += i;
    }
    res.send(`The result of the CPU intensive task is ${total}\n`);
});
app.get('/', async (req, res) => {
    // res.send(`Hi`);
     const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('This is my password', salt);
    return res.send(hashedPassword);
});
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
    console.log(`Worker pid = ${process.pid}`);
});
