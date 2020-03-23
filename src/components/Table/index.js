import React from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Container, Table, PageContainer, PageButton } from './styles';

export default function TableWrapper({
  children,
  page,
  hasNextPage,
  onNextPage,
  onPrevPage,
}) {
  return (
    <Container>
      <Table>{children}</Table>

      <PageContainer>
        <PageButton type="button" disabled={page === 1} onClick={onPrevPage}>
          <MdChevronLeft size={24} />
        </PageButton>

        <strong>{page}</strong>

        <PageButton type="button" disabled={!hasNextPage} onClick={onNextPage}>
          <MdChevronRight size={24} />
        </PageButton>
      </PageContainer>
    </Container>
  );
}

TableWrapper.propTypes = {
  page: PropTypes.number,
  children: PropTypes.element.isRequired,
  onNextPage: PropTypes.func,
  onPrevPage: PropTypes.func,
  hasNextPage: PropTypes.bool,
};

TableWrapper.defaultProps = {
  page: 1,
  onNextPage: () => {},
  onPrevPage: () => {},
  hasNextPage: false,
};
