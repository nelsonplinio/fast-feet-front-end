import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  MdMoreVert,
  MdAdd,
  MdVisibility,
  MdEdit,
  MdDelete,
} from 'react-icons/md';

import api from '~/services/api';

import SearchBox from '~/components/SearchBox';
import ActionButton from '~/components/ActionButton';
import Table from '~/components/Table';

import {
  Container,
  Toolbar,
  RegisterButton,
  Scroll,
  Deliveryman,
  StatusChips,
} from './styles';

export default function OrderList() {
  const history = useHistory();
  const [search, setSeach] = useState('');
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('/orders', {
        params: {
          q: search,
        },
      });

      const data = response.data.map(order => {
        let statusLabel = '';
        const [firstName = '', secondName = ''] = order.deliveryman.name.split(
          ' '
        );

        switch (order.status) {
          case 'canceled': {
            statusLabel = 'CANCELADO';
            break;
          }

          case 'withdrawn': {
            statusLabel = 'RETIRADA';
            break;
          }

          case 'delivered': {
            statusLabel = 'ENTREGUE';
            break;
          }

          default:
            statusLabel = 'PENDENTE';
        }

        return {
          ...order,
          deliveryman: {
            ...order.deliveryman,
            name: `${firstName} ${secondName}`,
            letters: `${firstName[0] || ''}${secondName[0] || ''}`,
          },
          statusLabel,
        };
      });

      setOrders(data);
    }
    loadOrders();
  }, [search]);

  async function handleDelete(id) {
    try {
      await api.delete(`/orders/${id}`);
      setOrders(orders.filter(order => order.id !== id));

      toast.success('Encomenda deletada com sucesso!');
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Não foi possivel realizar está ação!');
      }
    }
  }

  async function handleEdit(id) {
    history.push(`/order/edit/${id}`);
  }

  return (
    <Container>
      <strong>Gerenciando encomendas</strong>
      <Toolbar>
        <SearchBox
          debounceTimeout={300}
          placeholder="Buscar por encomendas"
          onChange={e => setSeach(e.target.value)}
        />

        <RegisterButton to="/order/register">
          <MdAdd size={22} color="#fff" />
          CADASTRAR
        </RegisterButton>
      </Toolbar>
      <Scroll>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Encomenda</th>
              <th>Destinatario</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={`${order.id}`}>
                <td>#{order.id}</td>
                <td>{order.product}</td>
                <td>{order.recipient.name}</td>
                <td>
                  <Deliveryman status={order.status}>
                    <div>
                      {order.deliveryman.avatar ? (
                        <img
                          src={order.deliveryman.avatar.url}
                          alt={order.deliveryman.name}
                        />
                      ) : (
                        <strong>{order.deliveryman.letters}</strong>
                      )}
                    </div>

                    {order.deliveryman.name}
                  </Deliveryman>
                </td>
                <td>{order.recipient.city}</td>
                <td>{order.recipient.state}</td>
                <td>
                  <StatusChips status={order.status}>
                    {order.statusLabel}
                  </StatusChips>
                </td>
                <td>
                  <ActionButton.Container>
                    <MdMoreVert size={24} color="#C6C6C6" />

                    <ActionButton.Options>
                      <ActionButton.Option>
                        <MdVisibility size={14} color="#8E5BE8" />
                        Visualizar
                      </ActionButton.Option>

                      <ActionButton.Option onClick={() => handleEdit(order.id)}>
                        <MdEdit size={14} color="#4D85EE" />
                        Editar
                      </ActionButton.Option>

                      <ActionButton.Option
                        onClick={() => handleDelete(order.id)}
                      >
                        <MdDelete size={14} color="#DE3B3B" />
                        Excluir
                      </ActionButton.Option>
                    </ActionButton.Options>
                  </ActionButton.Container>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Scroll>

      <div styles={{ height: 100 }} />
    </Container>
  );
}
