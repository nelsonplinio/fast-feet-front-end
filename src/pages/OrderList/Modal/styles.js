import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fafafa;
  border-radius: 8px;
  padding: 18px;
  display: flex;
  width: 500px;
  flex-direction: column;
`;

export const Product = styled.strong`
  font-size: 32px;
  margin-bottom: 16px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(200, 200, 200, 0.1);

  span {
    color: #777;
    font-size: 16px;
    strong {
    }
  }
`;

export const Label = styled.strong`
  font-size: 20px;
  margin-bottom: 16px;
`;

export const Signature = styled.img`
  width: 100%;
  height: 155px;
  margin-top: 16px;
  border-radius: 8px;
`;

export const WithdrawalButton = styled.button`
  border: 0;
  border-radius: 8px;
  height: 55px;
  background: #7159c1;
  color: #fff;
  font-weight: bold;

  transition: background 0.2s;
  &:hover {
    background: ${darken(0.1, '#7159c1')};
  }
`;
