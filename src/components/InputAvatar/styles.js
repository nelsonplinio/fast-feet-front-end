import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  margin-bottom: 30px;
  align-self: center;
  position: relative;
  overflow: hidden;
  height: 120px !important;
  width: 120px !important;
  border-radius: 50%;

  label {
    cursor: pointer;

    img {
      height: 120px !important;
      width: 120px !important;
      min-height: 120px !important;
      min-width: 120px !important;
      border-radius: 50%;
      border: ${({ hasError }) =>
        hasError
          ? '3px solid rgba(222, 59, 59, 0.7)'
          : '3px solid rgba(255, 255, 255, 0.3)'};
      background: #eee;
      overflow: hidden;
      text-align: center;
      object-fit: cover;
    }

    input {
      display: none;
    }
  }

  &:hover {
    &::after {
      content: 'Editar';
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-weight: bold;
      text-align: center;
      padding: 4px 0 16px;
      z-index: 20;
      pointer-events: none;
    }
  }
`;
