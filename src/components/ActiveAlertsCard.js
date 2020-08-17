import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { setAlertNotification } from "./../store/alert/actions";
import { setMetrics } from "./../store/metric/actions";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 300,
  },
});

export function ActiveAlertsCard({ setAlertNotification, setMetrics }) {
  const classes = useStyles();
  const [totalAlerts, setTotalAlerts] = React.useState(0);
  const [amountActiveAlerts, setAmountActiveAlerts] = React.useState(0);

  React.useEffect(() => {
    fetch("http://localhost:3000/alert/")
      .then((results) => results.json())
      .then((data) => {
        const activeAlerts = data.filter((e) => e.state).length;
        setAmountActiveAlerts(activeAlerts);
        setAlertNotification(activeAlerts);
        setTotalAlerts(data.length);
      });

    fetch("http://localhost:3000/metrics/")
      .then((results) => results.json())
      .then((data) => {
        setMetrics(data.filter((e) => e.name));
      });
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {amountActiveAlerts} / {totalAlerts} Alerts Turned On
        </Typography>
      </CardContent>
    </Card>
  );
}

export default connect(null, { setAlertNotification, setMetrics })(
  ActiveAlertsCard
);
