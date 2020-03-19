import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

export const Container = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  flex: 1;
`;

export const Label = styled.strong`
  color: #333;
  font-size: 15px;
`;

export const Input = styled(AsyncSelect)`
  padding: 10px 8px;
  background: #fff;
  border-radius: 4px;
  padding-left: 0;
  margin-top: 6px;
  color: #444444;
  font-weight: 500;
`;

export const Error = styled.span`
  margin-left: 4px;
  margin-top: 4px;
  color: #de3b3b;
`;
