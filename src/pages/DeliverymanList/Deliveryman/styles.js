import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form as UnForm } from '@unform/web';
import { darken } from 'polished';

export const Container = styled(UnForm)``;

export const Toolbar = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 16px 0 28px 0;

  strong {
    font-size: 22px;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

export const Content = styled.div`
  background: #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImagePreview = styled.label``;

export const SelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  background: #7d40e7;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px 16px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  transition: background 0.3s;

  svg {
    margin-right: 4px;
  }

  &:hover {
    background: ${darken(0.03, '#7d40e7')};
  }
`;

export const BackButton = styled(Link)`
  background: #ccc;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  transition: background 0.3s;

  svg {
    margin-right: 4px;
    color: #fff !important;
  }

  &:hover {
    background: ${darken(0.03, '#ccc')};
  }
`;

export const InputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 22px;
  margin-bottom: 16px;

  strong {
    margin-bottom: 8px;
  }
`;
