import styled from 'styled-components';
import { Form as UnForm } from '@unform/web';
import { darken } from 'polished';

export const Container = styled.div`
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
  padding: 52px 24px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 330px;
`;

export const Logo = styled.img`
  width: 240px;
`;

export const Form = styled(UnForm)`
  margin-top: 52px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  border: 0;
  background: #7d40e7;
  border-radius: 4px;
  margin-top: 16px;
  color: #fff;
  height: 35px;
  font-weight: bold;

  transition: background 0.4s;

  &:hover {
    background: ${darken(0.05, '#7D40E7')};
  }
`;
