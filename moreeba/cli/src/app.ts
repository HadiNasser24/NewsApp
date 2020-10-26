import Inquirer from 'inquirer';
import { magenta } from 'chalk';
import { textSync } from 'figlet';
import { exit } from 'process';

import * as Prompts from './prompts';
import { jsonConcat } from './utils/jsonUtils';
import { templateFactory } from './templateFactory';

const inertactiveCLI = async () => {
  const answer = await Inquirer.prompt(Prompts.entryPrompts);

  let template;
  let finalPrompt;

  switch (answer.type) {
    case 'feature':
      answer.template = 'feature';
      break;
    case 'component':
      template = await Inquirer.prompt(Prompts.componentPrompts);
      jsonConcat(answer, template);
      break;
    case 'quit':
      exit(0);
  }

  finalPrompt = await Inquirer.prompt(Prompts.finalPrompt);
  jsonConcat(answer, finalPrompt);
  templateFactory(answer);

  console.log(JSON.stringify(answer, null, '  '));
};

const main = async () => {
  console.clear();
  console.log(magenta(textSync('moreeba')));
  while (true) {
    await inertactiveCLI();
  }
};

main();
