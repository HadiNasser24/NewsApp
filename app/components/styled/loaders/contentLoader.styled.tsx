import React from 'react';
import { View, StyleSheet } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

interface Props {
  width: number;
  height: number;
}

const ContentPlaceHolder: React.FC<Props> = ({ width, height }: Props) => {
  return (
    <View style={styles.content}>
      <ContentLoader
        speed={1}
        width={width}
        height={height}
        backgroundColor="#d4d3d3"
        foregroundColor="#f2f2f2">
        <Rect x="0" y="2" rx="5" ry="5" width={width - 2} height={height - 2} />
      </ContentLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginVertical: 5,
  },
});

export { ContentPlaceHolder };
