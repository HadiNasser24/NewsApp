const finalPrompt = [
  {
    type: 'input',
    name: 'name',
    message: 'File name:',
    validate: (value: string) => {
      var pass = value.match(/^[a-z][A-Za-z]*$/i);
      if (pass) {
        return true;
      }

      return 'Please enter a valid file name';
    },
    filter: String,
  },
  {
    type: 'input',
    name: 'path',
    message: 'File path: ',
    validate: (value: string) => {
      var pass = value.match(/(^$)|(^[a-z][A-Za-z/]*$)/i);
      if (pass) {
        return true;
      }

      return 'Please enter a valid path';
    },
    filter: String,
  },
];

export { finalPrompt };
