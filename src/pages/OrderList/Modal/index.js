import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import { Container, Section, Label, Signature } from './styles';

export default function Modal({ order }) {
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
  return (
    <Container>
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
      {/* <Section>
        <Label>Informações da encomenda</Label>
        <span>Rua beethoven, 1529</span>
        <span>Diadema - SP</span>
        <span>00002123-22</span>
      </Section> */}
      <Section>
        <strong>Assinatura do destinatario</strong>
        {order.signature && <Signature src={order.signature.url} />}
      </Section>
    </Container>
  );
}

Modal.propTypes = {
  order: PropTypes.shape({
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
