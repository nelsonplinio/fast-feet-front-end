import * as Yup from 'yup';

export default err => {
  if (err instanceof Yup.ValidationError) {
    return err.inner.reduce(
      (errors, { path, message }) => ({
        [path]: message,
        ...errors,
      }),
      {}
    );
  }
  return err;
};
