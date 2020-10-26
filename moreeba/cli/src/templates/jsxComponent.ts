const jsxTemplate = (name: string) => {
  const newName = name.replace(/^./, name[0].toUpperCase());
  return `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  /** A text to be displayed in the center of this component */
  title: string;
}

const ${newName}: React.FC<Props> = (props) => {
  const { title } = props;
  return (
    <View style={styles.conatiner}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export { ${newName} };
`;
};

export { jsxTemplate };
