import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { MdClose } from 'react-icons/md';

import {
  Container,
  CloseButton,
  Title,
  CanceledDate,
  Description,
} from './styles';

export default function Modal({ problem, onClose }) {
  const problemFormatted = useMemo(
    () => ({
      ...problem,
      dateFormatted: format(parseISO(problem.createdAt), 'dd/MM/yyyy'),
    }),
    [problem]
  );
  return (
    <Container>
      <CloseButton onClick={onClose}>
        <MdClose size={18} color="#fff" />
      </CloseButton>

      <Title>Problema #{problemFormatted.id}</Title>
      <CanceledDate>{problemFormatted.dateFormatted}</CanceledDate>
      <Description>{problemFormatted.description}</Description>
    </Container>
  );
}

Modal.propTypes = {
  problem: PropTypes.shape({
    id: PropTypes.number,
    createdAt: PropTypes.string,
    description: PropTypes.string,
    delivery: PropTypes.shape({
      canceled_at: PropTypes.string,
    }),
  }).isRequired,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  onClose: () => {},
};
