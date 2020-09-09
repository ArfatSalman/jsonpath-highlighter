import React from 'react';
import FormCheck from 'react-bootstrap/FormCheck';

function Checkbox(props) {
  const { label, id, ...rest } = props;
  return (
    <FormCheck style={{ display: 'inline-block' }} type="checkbox" id={id}>
      <FormCheck.Input type={'checkbox'} {...rest} />
      <FormCheck.Label>{label}</FormCheck.Label>
    </FormCheck>
  );
}

export default Checkbox;