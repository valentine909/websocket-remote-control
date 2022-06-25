import robot from 'robotjs';
import type { Position } from './types';

const delay = 300;

const sleep = (): Promise<void> => new Promise((resolve) => {
  setTimeout(resolve, delay);
});

export const getMousePosition = (): Position => robot.getMousePos();

export const moveMouse = (mousePos: Position, x = 0, y = 0): void => {
  robot.dragMouse(mousePos.x + x, mousePos.y + y);
};

export const drawCircle = async (mousePos: Position, radius: number): Promise<void> => {
  robot.mouseToggle('down');
  await sleep();
  for (let i = 0; i <= Math.PI * 2.01; i += 0.1) {
    const x = mousePos.x + radius * Math.cos(i);
    const y = mousePos.y + radius * Math.sin(i);
    robot.dragMouse(x, y);
  }
  robot.mouseToggle('up');
};

export const drawRectangle = async (
  mousePos: Position,
  width: number,
  height = width,
): Promise<void> => {
  robot.mouseToggle('down');
  await sleep();
  robot.dragMouse(mousePos.x + width, mousePos.y);
  robot.dragMouse(mousePos.x + width, mousePos.y + height);
  robot.dragMouse(mousePos.x, mousePos.y + height);
  robot.dragMouse(mousePos.x, mousePos.y);
  robot.mouseToggle('up');
};
