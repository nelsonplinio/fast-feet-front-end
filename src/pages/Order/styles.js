import styled from 'styled-components';
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

export const SearchContainer = styled.label`
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 36px;
  width: 238px;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  background: #fff;

  input {
    border: none;
    flex: 1;
    margin-left: 8px;
  }
`;

export const RegisterButton = styled.button`
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

export const Table = styled.table`
  margin-top: 28px;
  width: 100%;
  margin-bottom: auto;
  flex: 1;
  border-spacing: 0 18px;

  thead {
    color: #444;
    padding: 22px 0;
    margin-bottom: 32px;
    th {
      padding: 12px;
      text-align: left;
    }

    & td:last-child {
      width: 22px;
    }
  }

  tbody {
    tr {
      border: none;
      background: #fff;

      & td:first-child {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }

      & td:last-child {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        width: 22px;
      }

      td {
        color: #666;
        font-size: 16px;
        padding: 22px 12px;
        border-spacing: 0 !important;
      }
    }
  }
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

export const ActionButton = styled.button`
  border: none;
  background: transparent;

  position: relative;

  svg {
    transition: color 0.2s;
  }

  &:hover > svg {
    color: #333 !important;
  }

  & > :last-child {
    max-height: 0;
  }

  &:hover > :last-child {
    max-height: 300px;
    transition: max-height 0.4s ease-in-out;
  }
`;

export const Options = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: calc(50% - 110px);

  background: #fafafa;
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 20;

  overflow: hidden;

  transition: max-height 0.25s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: -12px;
    left: calc(85% - 12px);
    height: 0;
    width: 0;
    z-index: 20;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid #fafafa;
  }
`;

export const Option = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  background: transparent;
  border-radius: 4px;

  transition: background 0.2s;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;
