import React, { useEffect, useRef } from 'react';
import { MdSearch, MdChevronLeft, MdDone } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';

import Input from '~/components/Input';
import api from '~/services/api';
import getErroMessages from '~/utils/getErroMessages';
import {
  BackButton,
  Container,
  Content,
  SubmitButton,
  Toolbar,
  CepContainer,
  InputGroup,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('É necessario informar o nome do entregador.'),
  postal_code: Yup.string().required('É necessario informar o cep.'),
  street: Yup.string().required('É necessario informar a rua.'),
  city: Yup.string().required('É necessario informar a cidade.'),
  state: Yup.string().required('É necessario informar o estado.'),
});

export default function Recipient() {
  const formRef = useRef(null);

  const { recipient_id } = useParams();

  useEffect(() => {
    async function loadDeliveryman() {
      const response = await api.get(`/recipients/${recipient_id}`);

      const {
        name,
        postal_code,
        street,
        number,
        complement,
        city,
        state,
      } = response.data;

      formRef.current.setFieldValue('name', name);

      formRef.current.setFieldValue('postal_code', postal_code);
      formRef.current.setFieldValue('street', street);
      formRef.current.setFieldValue('number', number);
      formRef.current.setFieldValue('complement', complement);
      formRef.current.setFieldValue('city', city);
      formRef.current.setFieldValue('state', state);
    }

    if (recipient_id) {
      loadDeliveryman();
    }
  }, [recipient_id]);

  async function handleRegisterSubmit(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        name,
        postal_code,
        street,
        number,
        complement,
        city,
        state,
      } = data;

      await api.post('/recipients', {
        name,
        postal_code,
        street,
        number,
        complement,
        city,
        state,
      });

      toast.success('Destinatário cadastrada com sucesso!');

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

      const {
        name,
        postal_code,
        street,
        number,
        complement,
        city,
        state,
      } = data;

      await api.put(`/recipients/${recipient_id}`, {
        name,
        postal_code,
        street,
        number,
        complement,
        city,
        state,
      });

      toast.success('Destinatário salvo com sucesso!');
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
    if (!recipient_id) {
      handleRegisterSubmit(data);
    } else {
      handleUpdateSubmit(data);
    }
  }

  async function handleSearchCep() {
    const cep = formRef.current.getFieldValue('postal_code').replace('-', '');
    const response = await axios.get(
      `https://apps.widenet.com.br/busca-cep/api/cep/${cep}.json`
    );

    if (response.data.ok) {
      const { state, city, district, address } = response.data;
      formRef.current.setFieldValue('state', state);
      formRef.current.setFieldValue('city', city);
      formRef.current.setFieldValue('street', `${district}, ${address}`);
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <Container ref={formRef} onSubmit={handleSubmit}>
      <Toolbar>
        <strong>
          {!recipient_id
            ? 'Cadastro de entregadores'
            : 'Edição de entregadores'}
        </strong>

        <div>
          <BackButton to="/recipient">
            <MdChevronLeft color="#fff" size={23} />
            Voltar
          </BackButton>
          <SubmitButton>
            <MdDone color="#fff" size={23} />
            {!recipient_id ? 'Cadastrar' : 'Salvar'}
          </SubmitButton>
        </div>
      </Toolbar>

      <Content>
        <Input name="name" label="Nome" />
        <CepContainer>
          <Input
            name="postal_code"
            label="CEP"
            mask={recipient_id ? null : '99999-999'}
            placeholder="Busque pelo seu CEP"
          />
          <button type="button" onClick={handleSearchCep}>
            <MdSearch size={32} />
          </button>
        </CepContainer>

        <InputGroup>
          <Input name="street" label="Rua" />
          <Input name="number" label="Numero" />
          <Input name="complement" label="Complemento" />
        </InputGroup>

        <InputGroup>
          <Input name="city" label="Cidade" />
          <Input name="state" label="Estado" />
        </InputGroup>
      </Content>
    </Container>
  );
}
