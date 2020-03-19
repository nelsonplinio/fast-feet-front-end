import styled from 'styled-components';

export default styled.table`
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
