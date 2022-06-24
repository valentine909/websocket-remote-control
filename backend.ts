// @ts-ignore
import { WebSocketServer } from 'ws';
import 'dotenv/config';
import { CommandsController } from './src/controller';

const PORT: number = process.env['PORT']
  ? parseInt(process.env['PORT'], 10)
  : 8081;

const wss = new WebSocketServer({ port: PORT });
console.log(`Backend server is starting on port: ${PORT}`);

wss.on('connection', (ws) => {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    CommandsController(this, data);
  });

  ws.send('Hello_from_backend');
});
