import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  Logo,
  MenuWrapper,
  NavContainer,
  Nav,
  Profile,
} from './styles';

import logo from '~/assets/logo.png';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <MenuWrapper>
        <Logo src={logo} />
        <NavContainer>
          <Nav to="/order">ENCOMENDAS</Nav>
          <Nav to="/deliveryman">ENTREGADORES</Nav>
          <Nav to="/recipient">DESTINATÁRIO</Nav>
          <Nav to="/problem">PROBLEMAS</Nav>
        </NavContainer>
      </MenuWrapper>
      <Profile>
        <Link to="/profile">{profile.name}</Link>
        <button type="button" onClick={handleLogout}>
          sair do sistema
        </button>
      </Profile>
    </Container>
  );
}
