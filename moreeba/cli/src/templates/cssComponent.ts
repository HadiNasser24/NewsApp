const cssTemplate = (name: string) => {
  const newName = name.replace(/^./, name[0].toUpperCase());
  return `import styled from 'styled-components/native';

import { colorPalette } from '&config/colors';

interface ${newName}Props {
  /** Color for the view's background */
  backgroundColor: string;
}

const ${newName} = styled.View<${newName}Props>\`
  background-color: \${(props) => props.backgroundColor};
\`;

export { ${newName} };
`;
};

export { cssTemplate };
