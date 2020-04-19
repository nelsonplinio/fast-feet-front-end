import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import {
  Container,
  Section,
  Label,
  Signature,
  Product,
  WithdrawalButton,
} from './styles';

import api from '~/services/api';

export default function Modal({ data }) {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(data);

  const orderFormatted = useMemo(
    () => ({
      ...order,
      start_date:
        order.start_date && format(parseISO(order.start_date), 'dd/MM/yyyy'),
      end_date:
        order.end_date && format(parseISO(order.end_date), 'dd/MM/yyyy'),
      canceled_at:
        order.canceled_at && format(parseISO(order.canceled_at), 'dd/MM/yyyy'),
    }),
    [order]
  );

  async function handleWithdrawal() {
    const isConfirm = window.confirm(
      'Deseja confirmar a retirada da encomenda?'
    );
    if (!isConfirm) {
      return;
    }
    const { deliveryman_id, id: delivery_id } = order;
    try {
      setLoading(true);
      const response = await api.post(
        `/deliveryman/${deliveryman_id}/deliveries/${delivery_id}/withdrawal`
      );
      toast.success('Encomenda retirada com sucesso!!!');
      setOrder({ ...data, ...response.data });
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error);
      }
    }
    setLoading(false);
  }

  return (
    <Container>
      <Product>{order.product}</Product>
      <Section>
        <Label>Informações da encomenda</Label>
        <span>
          {orderFormatted.recipient.street}, {orderFormatted.recipient.number}
        </span>
        <span>
          {orderFormatted.recipient.city} - {orderFormatted.recipient.state}
        </span>
        <span>{orderFormatted.recipient.postal_code}</span>
      </Section>
      <Section>
        <Label>Datas</Label>

        <span>
          <strong>Retirada: </strong>
          {orderFormatted.start_date && orderFormatted.start_date}
        </span>

        <span>
          <strong>Entrega: </strong>
          {orderFormatted.end_date && orderFormatted.end_date}
        </span>

        <span>
          <strong>Cancelamento: </strong>
          {orderFormatted.canceled_at && orderFormatted.canceled_at}
        </span>
      </Section>
      <Section>
        <strong>Assinatura do destinatario</strong>
        {order.signature && <Signature src={order.signature.url} />}
      </Section>

      {order.status === 'pending' && (
        <WithdrawalButton onClick={handleWithdrawal}>
          {loading ? 'Confirmando ...' : 'Confirmar Retirada'}
        </WithdrawalButton>
      )}
    </Container>
  );
}

Modal.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    deliveryman_id: PropTypes.number,
    product: PropTypes.string,
    canceled_at: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    recipient: PropTypes.shape({
      street: PropTypes.string,
      number: PropTypes.string,
      complement: PropTypes.string,
      state: PropTypes.string,
      city: PropTypes.string,
      postal_code: PropTypes.string,
    }),
    signature: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};
