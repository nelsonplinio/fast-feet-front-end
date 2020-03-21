import styled from 'styled-components';

export const Container = styled.button`
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

export const Option = styled.button.attrs({
  type: 'button',
})`
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
