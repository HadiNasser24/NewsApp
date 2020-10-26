const componentPrompts = [
  {
    type: 'list',
    name: 'template',
    message: 'template',
    choices: ['jsx', 'styled'],
    filter: (val: string) => {
      return val.toLowerCase();
    },
  },
];

export { componentPrompts };
