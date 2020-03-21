import React, { useRef, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput({ name }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [file, setFile] = useState(defaultValue);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const handlePreview = useCallback(async e => {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    setFile(response.data);
    setPreview(response.data.url);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      clearValue: () => {
        setFile(null);
        setPreview(null);
      },
      setValue: (_, data) => {
        if (data) {
          setPreview(data.url);
          setFile(data);
        }
      },
      getValue: () => {
        if (file) {
          return file.id;
        }
        return null;
      },
    });
  }, [file, preview, fieldName, inputRef, registerField]);

  return (
    <Container hasError={!!error}>
      <label htmlFor="avatar">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt=""
        />
        <input
          id="avatar"
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={handlePreview}
        />
      </label>
    </Container>
  );
}

AvatarInput.propTypes = {
  name: PropTypes.string.isRequired,
};
