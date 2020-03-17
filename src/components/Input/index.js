import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { Container, Label, Input, Error } from './styles';

export default function InputWrapper({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Input ref={inputRef} defaultValue={defaultValue} {...rest} />
      <Error hasError={!!error}>{error}</Error>
    </Container>
  );
}

InputWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

InputWrapper.defaultProps = {
  label: null,
};
