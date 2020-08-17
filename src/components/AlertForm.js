import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setMetricData } from "./../store/metric/reducer";
import { setSourceData } from "./../store/source/reducer";
import { setModalState } from "./../store/modal/actions";
import { updateAlertsAfterSubmit } from "./../store/alert/actions";
import { connect } from "react-redux";

const AlertFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .matches(/^([a-zA-Z0-9 _-]+)$/, "Name must be an alphanumeric value"),
  value: Yup.number()
    .required("Required")
    .typeError("Value must be a number")
    .max(100, "Value must be <= 100")
    .min(0, "Value must be >= 0"),
  trigger: Yup.string().required("Required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 300,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  field: {
    padding: 5,
    minWidth: 200,
  },
  button: {
    padding: 5,
    minWidth: 200,
  },
  textDanger: {
    color: theme.palette.error.main,
  },
}));

function handleSubmit(param) {
  let alert = {
    name: param.name,
    metricSource: param.source,
    metricUnit: param.metric,
    conditional: param.trigger,
    value: param.value,
    state: false,
  };
  fetch("/alert/", {
    method: "POST",
    body: JSON.stringify(alert),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function AlertForm({
  metrics,
  sources,
  close,
  setModalState,
  updateAlertsAfterSubmit,
}) {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <h1>Add a new Alarm here</h1>
      <Formik
        initialValues={{
          name: "",
          source: sources[0],
          metric: metrics[0].name,
          value: "",
          trigger: "higher",
        }}
        validationSchema={AlertFormSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleSubmit(values);
            setSubmitting(false);
            setModalState(false);
            updateAlertsAfterSubmit(true);
            close();
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={classes.field}>
              <Field
                className={classes.field}
                id="name"
                name="name"
                placeholder="Name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className={classes.textDanger}
              />
            </div>
            <label className={classes.field} htmlFor="source">
              Select a source
            </label>
            <div className={classes.field}>
              <Field
                className={classes.field}
                id="source"
                as="select"
                name="source"
              >
                {sources.map((source, index) => (
                  <option key={index} value={source} label={source}>
                    {source}
                  </option>
                ))}
              </Field>
            </div>
            <label className={classes.field} htmlFor="metric">
              Select a metric
            </label>
            <div className={classes.field}>
              <Field
                className={classes.field}
                id="metric"
                as="select"
                name="metric"
              >
                {metrics.map((metric, index) => (
                  <option key={index} value={metric.name} label={metric.name}>
                    {metric.name}
                  </option>
                ))}
              </Field>
            </div>
            <div className={classes.field}>
              <Field
                className={classes.field}
                id="value"
                name="value"
                placeholder="Value"
              />
              <ErrorMessage
                name="value"
                component="div"
                className={classes.textDanger}
              />
            </div>
            <label className={classes.field} htmlFor="firstName">
              Select a condition
            </label>
            <div
              id="trigger"
              role="group"
              aria-labelledby="my-radio-group"
              className={classes.field}
            >
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

function mapStateToProps(state) {
  return {
    metrics: setMetricData(state),
    sources: setSourceData(state),
  };
}

export default connect(mapStateToProps, {
  setModalState,
  updateAlertsAfterSubmit,
})(AlertForm);
