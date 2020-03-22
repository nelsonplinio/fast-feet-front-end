import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdMoreVert, MdAdd, MdDelete } from 'react-icons/md';

import { confirmAlert } from 'react-confirm-alert';
import api from '~/services/api';

import SearchBox from '~/components/SearchBox';
import ActionButton from '~/components/ActionButton';
import Table from '~/components/Table';

import { Container, Toolbar, RegisterButton, Name } from './styles';

export default function RecipientList() {
  const [search, setSeach] = useState('');
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('/recipients', {
        params: {
          q: search,
        },
      });

      setRecipients(response.data);
    }

    loadRecipients();
  }, [search]);

  function handleDelete(id) {
    confirmAlert({
      title: 'Deletar destinatário',
      message: 'Deseja realmente deletar está destinatário?',
      buttons: [
        {
          label: 'Deletar',
          onClick: async () => {
            try {
              await api.delete(`/recipients/${id}`);
              setRecipients(
                recipients.filter(recipient => recipient.id !== id)
              );

              toast.success('Destinatário deletada com sucesso!');
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

  return (
    <>
      <Container>
        <strong>Gerenciando destinatários</strong>
        <Toolbar>
          <SearchBox
            debounceTimeout={300}
            placeholder="Buscar por destinatário"
            onChange={e => setSeach(e.target.value)}
          />

          <RegisterButton to="/recipient/register">
            <MdAdd size={22} color="#fff" />
            CADASTRAR
          </RegisterButton>
        </Toolbar>

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Complemento</th>
              <th>Cidade / Estado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map(recipient => (
              <tr key={`${recipient.id}`}>
                <td>#{recipient.id}</td>

                <td>
                  <Name to={`/recipient/edit/${recipient.id}`}>
                    {recipient.name}
                  </Name>
                </td>

                <td>
                  {recipient.street} - {recipient.number}
                  <br />
                  {recipient.postal_code}
                </td>
                <td>{recipient.complement}</td>

                <td>
                  {recipient.city} / {recipient.state}
                </td>

                <td>
                  <ActionButton.Container>
                    <MdMoreVert size={24} color="#C6C6C6" />

                    <ActionButton.Options>
                      <ActionButton.Option
                        onClick={() => handleDelete(recipient.id)}
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
    </>
  );
}
