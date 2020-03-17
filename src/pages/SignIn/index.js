import React from 'react';

import Input from '~/components/Input';
import { Container, Logo, Form, SubmitButton } from './styles';

import logo from '~/assets/logo@2x.png';

export default function SignIn() {
  return (
    <Container>
      <Logo src={logo} />
      <Form>
        <Input name="email" label="Seu E-mail" placeholder="exemplo@mail.com" />
        <Input name="password" label="Sua Senha" placeholder="*********" />
        <SubmitButton>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}
