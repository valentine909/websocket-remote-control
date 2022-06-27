export const parseArgs = (instruction: string) => instruction
  .split(' ')
  .map((arg, index) => (index > 0 ? (parseInt(arg, 10) || undefined) : arg));

export const success = (instruction: string) => {
  console.log(
    'Command',
    '\x1b[33m',
    instruction,
    '\x1b[0m',
    'fullfilled successfully\n',
  );
};

export const failure = (instruction: string) => {
  console.log('Command', '\x1b[33m', instruction, '\x1b[0m', 'failed\n');
};
