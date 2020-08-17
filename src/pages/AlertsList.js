import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Button, Box } from "@material-ui/core";
import AlertsTable from "../components/AlertTable";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AlertSearch from "../components/AlertSearch";
import AlertForm from "../components/AlertForm";
import { setMetrics } from "./../store/metric/actions";
import { setSources } from "./../store/source/actions";
import { setAlerts } from "../store/alert/actions";
import { setAlertNotification } from "../store/alert/actions";
import { setModalState } from "./../store/modal/reducer";
import { setAllAlerts } from "../store/alert/reducer";
import { updateAlertsAfterSubmit } from "../store/alert/reducer";
import { searchState } from "../store/alert/reducer";
import { setAlertSearchState } from "../store/alert/actions";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  searchButton: {
    marginTop: 10,
    marginLeft: 10,
    minWidth: 200,
  },
  addButton: {
    marginTop: 10,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function createData(id, name, source, metric, trigger, value, state) {
  return { id, name, source, metric, trigger, value, state: state };
}

export function AlertsList({
  setMetrics,
  setSources,
  modalState,
  setAlertNotification,
  setAlerts,
  alertSeachState,
  setAlertSearchState,
}) {
  const classes = useStyles();
  const [alertIdFiltered, setAlertIdFiltered] = React.useState("");
  const [updateAlerts, setUpdateAlerts] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!updateAlerts) {
      fetch("http://localhost:3000/metrics/")
        .then((results) => results.json())
        .then((data) => {
          setMetrics(data.filter((e) => e.name));
        });

      fetch("http://localhost:3000/metricSource/")
        .then((results) => results.json())
        .then((data) => {
          setSources(data.map((e) => e.name));
        });
    }

    fetch("http://localhost:3000/alert/")
      .then((results) => results.json())
      .then((data) => {
        const formatedData = data.map((e) =>
          createData(
            e._id,
            e.name,
            e.metricSource,
            e.metricUnit,
            e.conditional,
            e.value,
            e.state
          )
        );

        setAlertNotification(data.filter((e) => e.state).length);

        if (alertSeachState && alertIdFiltered !== "") {
          setAlerts(formatedData.filter((e) => e.id === alertIdFiltered));
          setAlertSearchState(false);
        } else {
          setAlerts(formatedData);
        }
      });
  }, [updateAlerts]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    !modalState && setOpen(false);
    setUpdateAlerts(!updateAlerts);
  };

  const handleUpdateAlerts = (alert) => {
    setAlertIdFiltered(alert.id);
    setUpdateAlerts(!updateAlerts);
  };

  return (
    <Box component="div">
      <Typography variant="h5" component="h2">
        Alerts
      </Typography>
      <AlertSearch />
      <AlertsTable updateAlerts={handleUpdateAlerts} />
      <Box component="div" className={classes.addButton}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          New
        </Button>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <AlertForm close={handleClose} />
        </Fade>
      </Modal>
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    alerts: setAllAlerts(state),
    alertSeachState: searchState(state),
    updateAlertsAfterSubmitState: updateAlertsAfterSubmit(state),
    modalState: setModalState(state),
  };
}

export default connect(mapStateToProps, {
  setMetrics,
  setSources,
  setAlertNotification,
  setAlerts,
  setAlertSearchState,
})(AlertsList);
