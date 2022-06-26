// @ts-ignore
import { WebSocketServer, createWebSocketStream } from 'ws';
import 'dotenv/config';
import { CommandsController } from './src/controller';

const PORT: number = process.env['PORT']
  ? parseInt(process.env['PORT'], 10)
  : 8081;

const wss = new WebSocketServer({ port: PORT });
console.log(`Backend server is starting on port: ${PORT}`);

wss.on('connection', (ws) => {
  const stream = createWebSocketStream(ws, {
    encoding: 'utf-8',
    decodeStrings: false,
  });

  stream.on('data', (chunk) => {
    console.log('received: %s', chunk);
    CommandsController(stream, chunk);
  });

  stream.on('error', (error) => {
    console.log('smth goes wrong: %s', error);
  });

  stream.on('close', () => {
    console.log('disconnected');
  });

  stream.write('Session_started\0');
});
