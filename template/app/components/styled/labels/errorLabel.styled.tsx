import styled from 'styled-components/native';

import { colorPalette } from '&config/colors';

interface ErrorProps {
  /** make the text bold */
  isBold?: boolean;

  /** condition that will show the text when satisfied, default: false */
  show?: boolean;

  /** Font size, default: 12px */
  fontSize?: number;
}

const ErrorLabel = styled.Text<ErrorProps>`
  color: ${(props) => (props.show ? colorPalette.error : 'transparent')};
  font-size: ${(props) => props.fontSize || 12}px;
  font-weight: ${(props) => (props.isBold ? 'bold' : 'normal')};
  line-height: 23px;
  text-align: center;
`;

export { ErrorLabel };
