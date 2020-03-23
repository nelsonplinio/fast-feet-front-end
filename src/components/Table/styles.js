import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div``;

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
        position: relative;
        color: #666;
        font-size: 16px;
        padding: 22px 12px;
        border-spacing: 0 !important;
      }
    }
  }
`;

export const PageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 16px;

  strong {
    font-size: 18px;
    color: #7d40e7 !important;
    margin: 0 18px;
  }
`;

export const PageButton = styled.button.attrs({
  type: 'button',
})`
  background: #7d40e7;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px 12px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  transition: background 0.3s;

  opacity: ${({ disabled }) => {
    return disabled ? 0.5 : 1;
  }};

  svg {
    margin-right: 4px;
    font-size: 18px;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}

  &:hover {
    background: ${darken(0.03, '#7d40e7')};
  }
`;
