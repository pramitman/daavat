import server from './src';
import cluster from 'cluster'
import os from 'os'
import { config } from './config';
// if (cluster.isMaster)
//     for (let i = 0; i < os.cpus().length; i++) cluster.fork()
// else {
//     const port = process.env.PORT || 80;
//     server.listen(port, () => {
//         console.log(`server started on port ${port}`);
//     });
// }

const port = config.PORT || 7000;
server.listen(port, () => {
    console.log(`server started on port httP://localhost:${port}/swagger`);
});