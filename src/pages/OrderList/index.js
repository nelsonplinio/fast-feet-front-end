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

import { confirmAlert } from 'react-confirm-alert';
import api from '~/services/api';

import SearchBox from '~/components/SearchBox';
import ActionButton from '~/components/ActionButton';
import Table from '~/components/Table';
import Modal from './Modal';

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

  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState([]);

  const [page, setPage] = useState(1);
  const [pageEnded, setPageEnded] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('/orders', {
        params: {
          q: search,
          page,
        },
      });

      const { list, totalPage } = response.data;

      const listFormatted = list.map(order => {
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
      setOrders(listFormatted);
      setPageEnded(page === totalPage);
    }
    loadOrders();
  }, [search, page]);

  function handleDelete(id) {
    confirmAlert({
      title: 'Deletar encomenda',
      message: 'Deseja realmente deletar está encomenda?',
      buttons: [
        {
          label: 'Deletar',
          onClick: async () => {
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
          },
        },
        {
          label: 'Não',
        },
      ],
    });
  }

  async function handleEdit(id) {
    history.push(`/order/edit/${id}`);
  }

  function handleShowOrder(order) {
    confirmAlert({
      customUI: () => <Modal order={order} />,
    });
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  function handleSearch(e) {
    setPage(1);
    setSearch(e.target.value);
  }

  return (
    <Container>
      <strong>Gerenciando encomendas</strong>
      <Toolbar>
        <SearchBox
          debounceTimeout={300}
          placeholder="Buscar por encomendas"
          onChange={handleSearch}
        />

        <RegisterButton to="/order/register">
          <MdAdd size={22} color="#fff" />
          CADASTRAR
        </RegisterButton>
      </Toolbar>
      <Scroll>
        <Table
          page={page}
          hasNextPage={!pageEnded}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        >
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
                      <ActionButton.Option
                        onClick={() => handleShowOrder(order)}
                      >
                        <MdVisibility size={14} color="#8E5BE8" />
                        Visualizar
                      </ActionButton.Option>

                      {order.status === 'pending' && (
                        <>
                          <ActionButton.Option
                            onClick={() => handleEdit(order.id)}
                          >
                            <MdEdit size={14} color="#4D85EE" />
                            Editar
                          </ActionButton.Option>

                          <ActionButton.Option
                            onClick={() => handleDelete(order.id)}
                          >
                            <MdDelete size={14} color="#DE3B3B" />
                            Excluir
                          </ActionButton.Option>
                        </>
                      )}
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
