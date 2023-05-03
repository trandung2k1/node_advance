import express from 'express';
import EventEmitter from 'events';
const eventEmitter = new EventEmitter();
const port = 4000;
const app = express();
let task = [];
app.get('/', (req, res) => {
    task.push(function () {
        return req.headers;
    });
    req.user = {
        id: 1,
        username: 'Tran Dung',
        badObject: req,
    };
    eventEmitter.on('start', function () {
        console.log('Hi');
    });
    setTimeout(() => {
        res.send('Hello world!');
    });
});
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
