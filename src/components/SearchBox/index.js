import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { DebounceInput } from 'react-debounce-input';

import { Container } from './styles';

export default function SearchBox({ onChange, ...rest }) {
  return (
    <Container>
      <MdSearch size={18} color="#999" />
      <DebounceInput debounceTimeout={300} onChange={onChange} {...rest} />
    </Container>
  );
}

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
};
