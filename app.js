import os from 'os';
// performance use (dns, filesystem -> io, crypto, zlib, hash -> cpu)
// not expand more requirements
process.env.UV_THREADPOOL_SIZE = os.cpus().length;
import bcrypt from 'bcrypt';
import express from 'express';
const port = 4000;
const app = express();
app.get('/', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('This is my password', salt);
    return res.send(hashedPassword);
});
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
    console.log(`Worker pid = ${process.pid}`);
});
