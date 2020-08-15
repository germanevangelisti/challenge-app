import React from "react";
import { Box } from "@material-ui/core";
import ActiveAlertsCard from "../components/ActiveAlertsCard";
import AmountSourcesCard from "../components/AmountSourcesCard";

export default function Dashboard() {
  return (
    <Box display="flex" flexDirection="row" p={1} m={1}>
      <Box p={1}>
        <ActiveAlertsCard />
      </Box>
      <Box p={1}>
        <AmountSourcesCard />
      </Box>
    </Box>
  );
}
