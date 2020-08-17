import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Button, Container, Box } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { setAllAlerts } from "../store/alert/reducer";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  tableContainer: {
    marginTop: 10,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

async function handleUpdateAlarm(param) {
  let alert = {
    name: param.name,
    metricSource: param.source,
    metricUnit: param.metric,
    conditional: param.trigger,
    value: param.value,
    state: !param.state,
  };
  await fetch("/alert/" + param.id, {
    method: "PUT",
    body: JSON.stringify(alert),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function handleDeleteAlarm(param) {
  await fetch("/alert/" + param.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function AlertsTable({ alerts, updateAlerts }) {
  const classes = useStyles();

  const handleStatus = (values) => {
    handleUpdateAlarm(values).then((data) => updateAlerts(values));
  };

  const handleDelete = (values) => {
    handleDeleteAlarm(values).then((data) => updateAlerts(values));
  };

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Source</StyledTableCell>
            <StyledTableCell align="right">Metric</StyledTableCell>
            <StyledTableCell align="right">Trigger</StyledTableCell>
            <StyledTableCell align="right">Paused</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.source}</StyledTableCell>
              <StyledTableCell align="right">{row.metric}</StyledTableCell>
              <StyledTableCell align="right">
                {row.trigger === "higher" ? ">" : "<"} {row.value}%
              </StyledTableCell>
              <StyledTableCell align="right">
                {!row.state ? "YES" : "NO"}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="contained" color="primary">
                  Edit
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDelete(row)}
                >
                  Delete
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleStatus(row)}
                >
                  {!row.state ? "Resume" : "Pause"}
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function mapStateToProps(state) {
  return {
    alerts: setAllAlerts(state),
  };
}

export default connect(mapStateToProps)(AlertsTable);
