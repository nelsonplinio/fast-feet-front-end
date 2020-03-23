import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdMoreVert, MdVisibility, MdDelete } from 'react-icons/md';

import { confirmAlert } from 'react-confirm-alert';
import api from '~/services/api';

import ActionButton from '~/components/ActionButton';
import Table from '~/components/Table';
import Modal from './Modal';

import { Container, Description } from './styles';

export default function ProblemList() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('/problems');

      setProblems(response.data);
    }

    loadRecipients();
  }, []);

  function handleVisible(problem) {
    confirmAlert({
      customUI: ({ onClose }) => <Modal problem={problem} onClose={onClose} />,
    });
  }

  function handleCancel(id) {
    confirmAlert({
      title: 'Cancelar encomenda',
      message: 'Deseja cancelar está encomenda?',
      buttons: [
        {
          label: 'Cancelar encomenda',
          onClick: async () => {
            try {
              await api.post(`/problem/${id}/cancel-delivery`);
              setProblems(problems.filter(problem => problem.id !== id));

              toast.success('Encomenda cancelada com sucesso!');
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
        <strong>Gerenciandor de problemas</strong>

        <Table>
          <thead>
            <tr>
              <th>Encomenda</th>
              <th style={{ flex: 1 }}>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {problems.map(problem => (
              <tr key={`${problem.id}`}>
                <td>#{problem.delivery_id}</td>

                <td>
                  <Description>{problem.description}</Description>
                </td>
                <td>
                  <ActionButton.Container>
                    <MdMoreVert size={24} color="#C6C6C6" />

                    <ActionButton.Options>
                      <ActionButton.Option
                        onClick={() => handleVisible(problem)}
                      >
                        <MdVisibility size={14} color="#4D85EE" />
                        Visualizar
                      </ActionButton.Option>

                      {!problem.delivery.canceled_at && (
                        <ActionButton.Option
                          onClick={() => handleCancel(problem.id)}
                        >
                          <MdDelete size={14} color="#DE3B3B" />
                          Cancelar
                        </ActionButton.Option>
                      )}
                    </ActionButton.Options>
                  </ActionButton.Container>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
