## Cluster: request error little, expand more requirements

## Worker thread: multiple threads, handle multiple requests at the same time without blocking between threads

## In essence, the workers created by Cluster use child_process.fork() to communicate with the process that creates them through IPC (Inter-Process Communication).