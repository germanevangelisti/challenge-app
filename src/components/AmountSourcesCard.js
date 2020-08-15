import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 300
  }
});

export default function AmountSourcesCard() {
  const classes = useStyles();
  const [amountServers, setAmountServers] = React.useState(0);

  React.useEffect(() => {
    fetch('http://localhost:3000/metricSource/')
      .then(results => results.json())
      .then(data => setAmountServers(data.length));
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