import React, { useEffect, useRef } from 'react';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Input from '~/components/Input';
import InputAvatar from '~/components/InputAvatar';
import api from '~/services/api';
import getErroMessages from '~/utils/getErroMessages';
import {
  BackButton,
  Container,
  Content,
  SubmitButton,
  Toolbar,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('É necessario informar o nome do entregador.'),
  email: Yup.string()
    .email('É necessario um email valido.')
    .required(),
});

export default function Deliveryman() {
  const formRef = useRef(null);

  const { deliveryman_id } = useParams();

  useEffect(() => {
    async function loadDeliveryman() {
      const response = await api.get(`/deliverymans/${deliveryman_id}`);

      const { name, email, avatar: avatar_id } = response.data;

      formRef.current.setFieldValue('avatar_id', avatar_id);
      formRef.current.setFieldValue('name', name);
      formRef.current.setFieldValue('email', email);
    }

    if (deliveryman_id) {
      loadDeliveryman();
    }
  }, [deliveryman_id]);

  async function handleRegisterSubmit(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      const { avatar_id, name, email } = data;

      await api.post('/deliverymans', {
        avatar_id,
        name,
        email,
      });

      toast.success('Entregador cadastrada com sucesso!');

      formRef.current.reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        formRef.current.setErrors(getErroMessages(err));
        return;
      }

      if (err.response && err.response.data) {
        toast.error(err.response.data.error);
      }
    }
  }

  async function handleUpdateSubmit(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      const { avatar_id, name, email } = data;

      await api.put(`/deliverymans/${deliveryman_id}`, {
        avatar_id,
        name,
        email,
      });

      toast.success('Entregador atualizada com sucesso!');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        formRef.current.setErrors(getErroMessages(err));
        return;
      }

      if (err.response && err.response.data) {
        toast.error(err.response.data.error);
      }
    }
  }

  function handleSubmit(data) {
    if (!deliveryman_id) {
      handleRegisterSubmit(data);
    } else {
      handleUpdateSubmit(data);
    }
  }

  return (
    <Container ref={formRef} onSubmit={handleSubmit}>
      <Toolbar>
        <strong>
          {!deliveryman_id
            ? 'Cadastro de entregadores'
            : 'Edição de entregadores'}
        </strong>

        <div>
          <BackButton to="/deliveryman">
            <MdChevronLeft color="#fff" size={23} />
            Voltar
          </BackButton>
          <SubmitButton>
            <MdDone color="#fff" size={23} />
            {!deliveryman_id ? 'Cadastrar' : 'Salvar'}
          </SubmitButton>
        </div>
      </Toolbar>

      <Content>
        <InputAvatar name="avatar_id" />
        <Input name="name" label="Nome" />
        <Input name="email" label="E-mail" />
      </Content>
    </Container>
  );
}
