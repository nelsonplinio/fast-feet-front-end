import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdDone, MdChevronLeft } from 'react-icons/md';

import Input from '~/components/Input';
import InputSelect from '~/components/InputSelect';
import getErroMessages from '~/utils/getErroMessages';

import api from '~/services/api';

import {
  Container,
  Content,
  Toolbar,
  SelectorContainer,
  SubmitButton,
  BackButton,
} from './styles';

const schema = Yup.object().shape({
  recipient: Yup.string()
    .min(1, 'É necessario informar um Destinatario.')
    .required(),
  deliveryman: Yup.string()
    .min(1, 'É necessario informar um entregador.')
    .required(),
  product: Yup.string().required('É necessario informar o nome do produdo.'),
});

export default function Order() {
  const formRef = useRef(null);

  const { order_id } = useParams();

  useEffect(() => {
    async function loadOrderData() {
      const response = await api.get(`/orders/${order_id}`);

      formRef.current.setFieldValue('recipient', {
        value: response.data.recipient.id,
        label: response.data.recipient.name,
      });

      formRef.current.setFieldValue('deliveryman', {
        value: response.data.deliveryman.id,
        label: response.data.deliveryman.name,
      });

      formRef.current.setFieldValue('product', response.data.product);
    }

    if (order_id) {
      loadOrderData();
    }
  }, [order_id]);

  async function loadDeliveryman(q, callback) {
    try {
      const response = await api.get('/deliverymans', {
        params: {
          q,
        },
      });

      callback(
        response.data.list.map(({ id, name }) => ({
          value: id,
          label: name,
        }))
      );
    } catch (err) {
      toast.error('Não foi possivel carregar os entregadores.');
    }
  }

  async function loadRecipients(q, callback) {
    try {
      const response = await api.get('/recipients', {
        params: {
          q,
        },
      });

      callback(
        response.data.list.map(({ id, name }) => ({
          value: id,
          label: name,
        }))
      );
    } catch (err) {
      toast.error('Não foi possivel carregar os destinatarios.');
    }
  }

  async function handleRegisterSubmit(data) {
    try {
      formRef.current.setErrors({});
      await schema.validate(data, {
        abortEarly: false,
      });

      const { recipient, deliveryman, product } = data;

      await api.post('/orders', {
        product,
        recipient_id: recipient.value,
        deliveryman_id: deliveryman.value,
      });

      formRef.current.reset();

      toast.success('Encomenda cadastrada com sucesso!');
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

      const { recipient, deliveryman, product } = data;

      await api.put(`/orders/${order_id}`, {
        product,
        recipient_id: recipient.value,
        deliveryman_id: deliveryman.value,
      });

      toast.success('Encomenda atualizada com sucesso!');
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
    if (!order_id) {
      handleRegisterSubmit(data);
    } else {
      handleUpdateSubmit(data);
    }
  }
  return (
    <Container ref={formRef} onSubmit={handleSubmit}>
      <Toolbar>
        <strong>
          {!order_id ? 'Cadastro de encomendas' : 'Edição de encomendas'}
        </strong>

        <div>
          <BackButton to="/order">
            <MdChevronLeft color="#fff" size={23} />
            Voltar
          </BackButton>
          <SubmitButton>
            <MdDone color="#fff" size={23} />
            {!order_id ? 'Cadastrar' : 'Salvar'}
          </SubmitButton>
        </div>
      </Toolbar>

      <Content>
        <SelectorContainer>
          <InputSelect
            name="recipient"
            label="Destinatário"
            loadOptions={loadRecipients}
            placeholder="Selecione um destinatário"
            defaultOptions
            noOptionsMessage={() => 'Nenhum destinatário encontrado. '}
          />

          <InputSelect
            name="deliveryman"
            label="Entregador"
            loadOptions={loadDeliveryman}
            placeholder="Selecione um entregador"
            defaultOptions
            noOptionsMessage={() => 'Nenhum entregador encontrado.'}
          />
        </SelectorContainer>

        <Input name="product" label="Nome do produto" placeholder="EX: Tv 4k" />
      </Content>
    </Container>
  );
}
