import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { setSources } from "./../store/source/actions";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 300,
  },
});

export function AmountSourcesCard({ setSources }) {
  const classes = useStyles();
  const [amountServers, setAmountServers] = React.useState(0);

  React.useEffect(() => {
    fetch("http://localhost:3000/metricSource/")
      .then((results) => results.json())
      .then((data) => {
        setAmountServers(data.length);
        setSources(data.map((e) => e.name));
      });
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Listening {amountServers} Servers
        </Typography>
      </CardContent>
    </Card>
  );
}

export default connect(null, { setSources })(AmountSourcesCard);
