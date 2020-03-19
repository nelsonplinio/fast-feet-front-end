import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { Container, Label, Input, Error } from './styles';

export default function InputSelect({ name, label, loadOptions, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'select.state.value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Input
        cacheOptions
        ref={inputRef}
        loadOptions={loadOptions}
        defaultValue={defaultValue}
        classNamePrefix="react-select"
        {...rest}
      />
      <Error hasError={!!error}>{error}</Error>
    </Container>
  );
}

InputSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  loadOptions: PropTypes.func,
  onInputChange: PropTypes.func.isRequired,
  defaultOptions: PropTypes.bool,
};

InputSelect.defaultProps = {
  label: null,
  loadOptions: () => {},
  defaultOptions: false,
};
