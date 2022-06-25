// @ts-ignore
import { WebSocketServer, RawData } from 'ws';
import 'dotenv/config';
import { CommandsController } from './src/controller';

const PORT: number = process.env['PORT']
  ? parseInt(process.env['PORT'], 10)
  : 8081;

const wss = new WebSocketServer({ port: PORT });
console.log(`Backend server is starting on port: ${PORT}`);

wss.on('connection', (ws) => {
  let instruction: RawData;
  ws.on('message', function message(data) {
    instruction = data;
    console.log('received: %s', data);
    CommandsController(this, data);
  });

  ws.on('error', () => {
    console.log('Command', '\x1b[33m', instruction.toString(), '\x1b[0m', 'failed');
  });

  ws.on('close', () => {
    console.log('disconnected');
  });

  ws.send('Hello_from_backend\0');
});
