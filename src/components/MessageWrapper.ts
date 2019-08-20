import styled from 'styled-components';
import color from './Color';

interface MessageWrapperProps {
  width?: string;
  error?: boolean;
}

const MessageWrapper = styled.div<MessageWrapperProps>`
  margin-top: 10px;
  width: ${({ width }) => (width || '100%')};
  font-size: 12px;
  line-height: 14px;
  color: ${({ error }) => (error ? color.red : color.grey)};
  font-weight: 300;
`;

export default MessageWrapper;
