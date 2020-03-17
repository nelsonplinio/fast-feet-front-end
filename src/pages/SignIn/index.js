import React, { useRef, useState } from 'react';
import * as Yup from 'yup';

import Input from '~/components/Input';
import { Container, Logo, Form, SubmitButton } from './styles';

import logo from '~/assets/logo@2x.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail valido!')
    .required('E-mail é obrigatorio!'),
  password: Yup.string()
    .min(6, 'E necessario no minimo 6 digitos!')
    .required('Senha é obrigatorio!'),
});

export default function SignIn() {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErros = err.inner.reduce(
          (errors, { path, message }) => ({
            [path]: message,
            ...errors,
          }),
          {}
        );

        formRef.current.setErrors(validationErros);
      }
    }
  }

  return (
    <Container>
      <Logo src={logo} />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" label="Seu E-mail" placeholder="exemplo@mail.com" />
        <Input
          name="password"
          type="password"
          label="Sua Senha"
          placeholder="*********"
        />
        <SubmitButton>
          {loading ? 'Entrar no sistema...' : 'Entrar no sistema'}
        </SubmitButton>
      </Form>
    </Container>
  );
}
