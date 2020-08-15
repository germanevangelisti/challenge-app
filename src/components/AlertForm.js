import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AlertForm.css'

const AlertFormSchema = Yup.object().shape({
  name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'), // TODO: only alphanumerics values
    source: Yup.string()
      .required('Required'),
    metric: Yup.string()
      .required('Required'),
    value: Yup.string()
    .required('Required'),
    trigger: Yup.string()
      .required('Required')
});

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 300
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

function handleSubmit (param) {
    let alert = {
      name: param.name,
      metricSource: param.source,
      metricUnit: param.metric,
      conditional: param.trigger,
      value: param.value,
      state: false
    }
    fetch('/alert/', {
      method: 'POST',
      body: JSON.stringify(alert),
      headers: {
        'Content-Type': 'application/json'
      }
    });
}

export default function AlertForm() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
        <h1>Add a new Alarm here</h1>
        <Formik
        initialValues={{ name: '', source: '', metric: '', value: '', trigger: '' }}
        validationSchema={AlertFormSchema}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
            handleSubmit(values)
            setSubmitting(false);
            }, 400);
        }}
        >
        {({ isSubmitting }) => (
            <Form>
              <div className="field">
                <Field id="name" name="name" placeholder="Name" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
              <div className="field">
                <Field id="source" name="source" placeholder="Source" />
                <ErrorMessage name="source" component="div" className="text-danger" />
              </div>
              <div className="field">
                <Field id="metric" name="metric" placeholder="Metric" />
                <ErrorMessage name="metric" component="div" className="text-danger" />
              </div>
              <div className="field">
                <Field id="value" name="value" placeholder="Value" />
                <ErrorMessage name="value" component="div" className="text-danger" />
              </div>
              <div role="group" aria-labelledby="my-radio-group" className="field">
                  <label>
                    <Field type="radio" name="trigger" value="higher" />
                      Higher
                  </label>
                  <label>
                      <Field type="radio" name="trigger" value="lower" />
                      Lower
                  </label>
              </div>
              <button type="submit" disabled={isSubmitting} className="button">
                  Create
              </button>
            </Form>
        )}
        </Formik>
    </div>
  );
}