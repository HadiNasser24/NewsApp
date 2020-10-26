import inquirer from 'inquirer';

const entryPrompts = [
  {
    type: 'list',
    name: 'type',
    message: 'What do you want to create?',
    choices: ['feature', 'component', new inquirer.Separator(), 'quit'],
    filter: (val: string) => {
      return val.toLowerCase();
    },
  },
];

export { entryPrompts };
