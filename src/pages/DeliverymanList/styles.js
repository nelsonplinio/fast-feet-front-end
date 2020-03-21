import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 28px;
    color: #444;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 34px;
`;

export const RegisterButton = styled(Link)`
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

export const Scroll = styled(PerfectScrollbar)`
  /* flex: 1; */
  /* max-height: 60%; */
`;

export const Deliveryman = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #666;
  font-weight: bold;

  div {
    height: 28px;
    width: 28px;
    border-radius: 50% !important;
    overflow: hidden;
    background: #ffeef1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    strong {
      font-size: 13px;
      color: ${darken(0.2, '#FFEEF1')};
      text-transform: uppercase;
    }
  }
`;
