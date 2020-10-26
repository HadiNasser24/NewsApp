import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  onPress: () => void;
}

interface SquareViewProps {
  length: number;
}

const SquareCard: React.FC<Props & SquareViewProps> = (props) => {
  const { length, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <SquareView length={length}>{props.children}</SquareView>
    </TouchableOpacity>
  );
};

const SquareView = styled.View<SquareViewProps>`
  align-items: center;
  background-color: #eee;
  flex: 1;
  justify-content: center;
  margin-vertical: 2px;
  width: ${(props) => props.length}px;
  height: ${(props) => props.length}px;
  border-radius: 10px;
`;

export { SquareCard };
