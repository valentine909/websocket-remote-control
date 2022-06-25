export const parseArgs = (instruction: string) => instruction
  .split(' ')
  .map((arg, index) => (index > 0 ? parseInt(arg, 10) : arg));
