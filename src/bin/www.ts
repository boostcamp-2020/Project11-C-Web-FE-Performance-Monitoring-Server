import { createServer } from 'http';
import app from '../app';

const port: number = Number(process.env.PORT) || 3000;

const server = createServer(app);

server.listen(port, () => {
  console.log(`port:${port} server running...`);
});

export default server;
