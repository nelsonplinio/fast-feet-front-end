import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

export const Label = styled.strong`
  color: #333;
  font-size: 15px;
`;

export const Input = styled.input`
  padding: 10px 8px;
  background: #fff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  margin-left: 4px;
  margin-top: 6px;
  color: #444444;
  font-weight: 500;
`;

export const Error = styled.span`
  margin-left: 4px;
  margin-top: 4px;
  color: #de3b3b;
`;
