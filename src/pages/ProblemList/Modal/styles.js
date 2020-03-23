import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: relative;
  background: #fcfcfc;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  max-width: 860px;
`;

export const CloseButton = styled.button.attrs({
  type: 'button',
})`
  border: 0;
  background: #7d40e7;
  color: #fff;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.4s;
  position: absolute;
  top: -8px;
  left: calc(100% - 16px);

  &:hover {
    background: ${darken(0.05, '#7D40E7')};
  }
`;

export const Title = styled.strong`
  font-size: 26px;
  color: #666;
`;

export const CanceledDate = styled.span`
  font-size: 16px;
  color: #999;
`;

export const Description = styled.strong`
  font-size: 20px;
  color: #999;
  margin-top: 22px;
  display: flex;
  flex-direction: column;

  &::before {
    content: 'Descrição';
    font-size: 16px;
    font-weight: normal;
  }
`;
