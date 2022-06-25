// @ts-ignore
import type { RawData } from 'ws';
// @ts-ignore
import type WebSocket from 'ws';
import { FrontCommands } from './commands';
import {
  drawCircle,
  drawRectangle,
  getMousePosition,
  moveMouse,
} from './handlers';
import { parseArgs } from './helper';
import { getScreenShot } from './screenshotHandler';

export const CommandsController = async (ws: WebSocket, instruction: RawData): Promise<void> => {
  const [command, width, height] = parseArgs(instruction.toString());
  const pos = getMousePosition();
  switch (command) {
    case FrontCommands.circle:
      if (typeof width === 'number') {
        moveMouse(pos, width);
        drawCircle(pos, width);
        ws.send(FrontCommands.circle);
      }
      break;
    case FrontCommands.square:
      if (typeof width === 'number') {
        drawRectangle(pos, width);
        ws.send(FrontCommands.square);
      }
      break;
    case FrontCommands.rectangle:
      if (typeof width === 'number' && typeof height === 'number') {
        drawRectangle(pos, width, height);
        ws.send(FrontCommands.rectangle);
      }
      break;
    case FrontCommands.position:
      ws.send(`${FrontCommands.position} ${pos.x},${pos.y}`);
      break;
    case FrontCommands.screen:
      ws.send(`${FrontCommands.screen} ${await getScreenShot(pos)}`);
      break;
    case FrontCommands.up:
      if (typeof width === 'number') {
        moveMouse(pos, 0, -width);
        ws.send(`${FrontCommands.up}`);
      }
      break;
    case FrontCommands.down:
      if (typeof width === 'number') {
        moveMouse(pos, 0, width);
        ws.send(`${FrontCommands.down}`);
      }
      break;
    case FrontCommands.right:
      if (typeof width === 'number') {
        moveMouse(pos, width, 0);
        ws.send(`${FrontCommands.right}`);
      }
      break;
    case FrontCommands.left:
      if (typeof width === 'number') {
        moveMouse(pos, -width, 0);
        ws.send(`${FrontCommands.left}`);
      }
      break;
    default:
      break;
  }
};
