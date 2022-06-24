// @ts-ignore
import type { RawData } from 'ws';
// @ts-ignore
import type WebSocket from 'ws';
import { FrontCommands } from './commands';
import { drawCircle, getMousePosition } from './handler';

export const CommandsController = (ws: WebSocket, instruction: RawData) => {
  const command = instruction.toString().split(' ')[0];
  const args = instruction.toString().split(' ').slice(1);
  const pos = getMousePosition();
  switch (command) {
    case FrontCommands.circle:
      drawCircle(args);
      ws.send(FrontCommands.circle);
      break;
    case FrontCommands.mouse:
      ws.send(`${FrontCommands.mouse} ${pos.x},${pos.y}`);
      break;
    default:
      break;
  }
};
