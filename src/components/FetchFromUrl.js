import React from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { setJSONData } from '../data/actions';

const schema = yup.object({
  url: yup.string().url().required(),
});

export function FromUrl(props) {
  const dispatch = useDispatch();
  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        url: '',
      }}
      validateOnBlur={false}
      onSubmit={async (data, formikBag) => {
        const { setErrors } = formikBag;
        const { url } = data;
        try {
          const response = await fetch(url);
          const json = await response.json();
          dispatch(setJSONData(json));
        } catch (ex) {
          setErrors({ url: `Couldn't reach ${url} or it did not return JSON.` });
        }
      }}
      {...props}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group>
            <Form.Label>From URL</Form.Label>
            <Form.Control
              value={values.url}
              onChange={handleChange}
              onBlur={handleBlur}
              name="url"
              type="url"
              isInvalid={!isValid}
            />
            <Form.Control.Feedback type="invalid">
              {errors.url}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant={'light'}
            disabled={isSubmitting}
            block
            type="submit"
            size="sm"
          >
            Download
          </Button>
        </Form>
      )}
    </Formik>
  );
}
