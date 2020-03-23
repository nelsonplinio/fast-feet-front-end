import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdMoreVert, MdAdd, MdDelete } from 'react-icons/md';

import { confirmAlert } from 'react-confirm-alert';
import api from '~/services/api';

import SearchBox from '~/components/SearchBox';
import ActionButton from '~/components/ActionButton';
import Table from '~/components/Table';

import { Container, Toolbar, RegisterButton, Deliveryman } from './styles';

export default function DeliverymanList() {
  const [search, setSearch] = useState('');
  const [deliverymans, setDeliverymans] = useState([]);

  const [page, setPage] = useState(1);
  const [pageEnded, setPageEnded] = useState(true);

  useEffect(() => {
    async function loadDeliverymans() {
      const response = await api.get('/deliverymans', {
        params: {
          q: search,
          page,
        },
      });

      const { list, totalPage } = response.data;
      setDeliverymans(
        list.map(deliveryman => {
          const [firstName = '', secondName = ''] = deliveryman.name.split(' ');

          return {
            ...deliveryman,
            letters: `${firstName[0] || ''}${secondName[0] || ''}`,
          };
        })
      );
      setPageEnded(page === totalPage);
    }

    loadDeliverymans();
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
              await api.delete(`/deliverymans/${id}`);
              setDeliverymans(
                deliverymans.filter(deliveryman => deliveryman.id !== id)
              );

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
      <strong>Gerenciando entregadores</strong>
      <Toolbar>
        <SearchBox
          debounceTimeout={300}
          placeholder="Buscar por entregadores"
          onChange={handleSearch}
        />

        <RegisterButton to="/deliveryman/register">
          <MdAdd size={22} color="#fff" />
          CADASTRAR
        </RegisterButton>
      </Toolbar>

      <Table
        page={page}
        hasNextPage={!pageEnded}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Entregador</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliverymans.map(deliveryman => (
            <tr key={`${deliveryman.id}`}>
              <td>#{deliveryman.id}</td>

              <td>
                <Deliveryman to={`/deliveryman/edit/${deliveryman.id}`}>
                  <div>
                    {deliveryman.avatar ? (
                      <img
                        src={deliveryman.avatar.url}
                        alt={deliveryman.name}
                      />
                    ) : (
                      <strong>{deliveryman.letters}</strong>
                    )}
                  </div>

                  {deliveryman.name}
                </Deliveryman>
              </td>
              <td>{deliveryman.email}</td>

              <td>
                <ActionButton.Container>
                  <MdMoreVert size={24} color="#C6C6C6" />

                  <ActionButton.Options>
                    <ActionButton.Option
                      onClick={() => handleDelete(deliveryman.id)}
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

      <div styles={{ height: 100 }} />
    </Container>
  );
}
