// @ts-ignore
import type WebSocket, { RawData } from 'ws';
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
        ws.send(`${FrontCommands.circle}\0`);
      }
      break;
    case FrontCommands.square:
      if (typeof width === 'number') {
        drawRectangle(pos, width);
        ws.send(`${FrontCommands.square}\0`);
      }
      break;
    case FrontCommands.rectangle:
      if (typeof width === 'number' && typeof height === 'number') {
        drawRectangle(pos, width, height);
        ws.send(`${FrontCommands.rectangle}\0`);
      }
      break;
    case FrontCommands.position:
      ws.send(`${FrontCommands.position} ${pos.x},${pos.y}\0`);
      break;
    case FrontCommands.screen:
      ws.send(`${FrontCommands.screen} ${await getScreenShot(pos)}\0`);
      break;
    case FrontCommands.up:
      if (typeof width === 'number') {
        moveMouse(pos, 0, -width);
        ws.send(`${FrontCommands.up}\0`);
      }
      break;
    case FrontCommands.down:
      if (typeof width === 'number') {
        moveMouse(pos, 0, width);
        ws.send(`${FrontCommands.down}\0`);
      }
      break;
    case FrontCommands.right:
      if (typeof width === 'number') {
        moveMouse(pos, width, 0);
        ws.send(`${FrontCommands.right}\0`);
      }
      break;
    case FrontCommands.left:
      if (typeof width === 'number') {
        moveMouse(pos, -width, 0);
        ws.send(`${FrontCommands.left}\0`);
      }
      break;
    default:
      break;
  }
  console.log('Command', '\x1b[33m', instruction.toString(), '\x1b[0m', 'fullfilled successfully');
};
