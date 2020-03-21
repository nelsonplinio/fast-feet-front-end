import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  height: 64px;
  background: #fff;
  display: flex;
  border: 1px solid #dddddd;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 16px 22px;
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const Logo = styled.img`
  width: 135px;
  height: 26px;
`;

export const NavContainer = styled.div`
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #ddd;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const Nav = styled(NavLink).attrs({
  activeStyle: {
    color: '#555',
  },
})`
  color: #999;
  font-weight: bold;
  transition: color 0.2s;

  & + & {
    margin-left: 16px;
  }

  &:hover {
    color: #666;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  a {
    color: #555;
    font-size: 14px;
    transition: color 0.2s;
    &:hover {
      color: #333;
    }
  }

  button {
    border: none;
    background: none;
    margin-top: 8px;
    color: #de3b3b;
  }
`;
