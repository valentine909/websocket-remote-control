import robot from "robotjs";
import type { Position } from "./types";

export const drawCircle = (parameters: string[]) => {
  const radius = parameters[0] ? parseInt(parameters[0]) : 0;
  const mousePos = robot.getMousePos();
  robot.dragMouse(mousePos.x + radius, mousePos.y);
  robot.mouseToggle("down");
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const x = mousePos.x + radius * Math.cos(i);
    const y = mousePos.y + radius * Math.sin(i);
    robot.dragMouse(x, y);
  }
  robot.mouseToggle("up");
};

export const getMousePosition = (): Position => {
  return robot.getMousePos();
};
