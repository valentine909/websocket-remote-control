import type { RawData } from "ws";
import type WebSocket from "ws";
import { FrontCommands } from "./commands";
import { drawCircle, getMousePosition } from "./handler";

export const CommandsController = (ws: WebSocket, instruction: RawData) => {
  const command = instruction.toString().split(" ")[0];
  const args = instruction.toString().split(" ").slice(1);
  switch (command) {
    case FrontCommands.circle:
      drawCircle(args);
      ws.send(FrontCommands.circle);
      break;
    case FrontCommands.mouse:
      const pos = getMousePosition();
      ws.send(`${FrontCommands.mouse} ${pos.x},${pos.y}`);
      break;
    default:
      break;
  }
};
