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

export const Deliveryman = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

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
    }

    strong {
      font-size: 13px;
      color: ${darken(0.2, '#FFEEF1')};
      text-transform: uppercase;
    }
  }
`;

export const StatusChips = styled.div`
  position: relative;

  border-radius: 18px;
  padding: 6px 8px 6px 25px;
  width: fit-content;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 13px;

  background: ${({ status }) => {
    switch (status) {
      case 'canceled': {
        return '#FAB0B0';
      }

      case 'withdrawn': {
        return '#BAD2FF';
      }

      case 'delivered': {
        return '#DFF0DF';
      }

      default:
        return '#F0F0DF';
    }
  }};

  color: ${({ status }) => {
    switch (status) {
      case 'canceled': {
        return darken(0.3, '#FAB0B0');
      }

      case 'withdrawn': {
        return darken(0.3, '#BAD2FF');
      }

      case 'delivered': {
        return darken(0.3, '#DFF0DF');
      }

      default:
        return darken(0.3, '#F0F0DF');
    }
  }};

  &::before {
    content: '';
    position: absolute;
    height: 10px;
    width: 10px;
    left: 8px;
    top: calc(50% - 5px);

    border-radius: 50%;

    background: ${({ status }) => {
      switch (status) {
        case 'canceled': {
          return darken(0.3, '#FAB0B0');
        }

        case 'withdrawn': {
          return darken(0.3, '#BAD2FF');
        }

        case 'delivered': {
          return darken(0.3, '#DFF0DF');
        }

        default:
          return darken(0.3, '#F0F0DF');
      }
    }};
  }
`;
