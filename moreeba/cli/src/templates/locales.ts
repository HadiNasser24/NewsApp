const localsTemplate = (name: string) => {
  return `let ${name} = {
  /* [TOKEN]:LOCALS -- Do not remove */
};

export default ${name};
`;
};

export { localsTemplate };
