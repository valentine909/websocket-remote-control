import type internal from 'stream';
import { FrontCommands } from './commands';
import {
  drawCircle,
  drawRectangle,
  getMousePosition,
  moveMouse,
} from './handlers';
import { failure, parseArgs, success } from './helper';
import { getScreenShot } from './screenshotHandler';

export const CommandsController = async (
  stream: internal.Duplex,
  instruction: string,
): Promise<void> => {
  const [command, width, height] = parseArgs(instruction);
  const pos = getMousePosition();
  console.log(command, width, height);
  switch (command) {
    case FrontCommands.circle:
      if (typeof width === 'number') {
        moveMouse(pos, width);
        drawCircle(pos, width);
        stream.write(`${FrontCommands.circle}\0`);
        success(instruction);
      } else {
        failure(instruction);
      }
      break;
    case FrontCommands.square:
      if (typeof width === 'number') {
        drawRectangle(pos, width);
        stream.write(`${FrontCommands.square}\0`);
        success(instruction);
      } else {
        failure(instruction);
      }
      break;
    case FrontCommands.rectangle:
      if (typeof width === 'number' && typeof height === 'number') {
        drawRectangle(pos, width, height);
        stream.write(`${FrontCommands.rectangle}\0`);
        success(instruction);
      } else {
        failure(instruction);
      }
      break;
    case FrontCommands.position:
      stream.write(`${FrontCommands.position} ${pos.x},${pos.y}\0`);
      success(instruction);
      break;
    case FrontCommands.screen:
      stream.write(`${FrontCommands.screen} ${await getScreenShot(pos)}\0`);
      success(instruction);
      break;
    case FrontCommands.up:
      if (typeof width === 'number') {
        moveMouse(pos, 0, -width);
        stream.write(`${FrontCommands.up}\0`);
        success(instruction);
      } else {
        failure(instruction);
      }
      break;
    case FrontCommands.down:
      if (typeof width === 'number') {
        moveMouse(pos, 0, width);
        stream.write(`${FrontCommands.down}\0`);
        success(instruction);
      } else {
        failure(instruction);
      }
      break;
    case FrontCommands.right:
      if (typeof width === 'number') {
        moveMouse(pos, width, 0);
        stream.write(`${FrontCommands.right}\0`);
        success(instruction);
      } else {
        failure(instruction);
      }
      break;
    case FrontCommands.left:
      if (typeof width === 'number') {
        moveMouse(pos, -width, 0);
        stream.write(`${FrontCommands.left}\0`);
        success(instruction);
      } else {
        failure(instruction);
      }
      break;
    default:
      stream.write('Unknown command\0');
      failure(instruction);
      break;
  }
};
