export const setAlerts = (alerts) => {
  return {
    type: "SET_ALERTS",
    payload: alerts,
  };
};

export const setAlertSearchState = (alertSearchState) => {
  return {
    type: "SET_ALERT_SEARCH_STATE",
    payload: alertSearchState,
  };
};

export const setAlertNotification = (activeAlerts) => {
  return {
    type: "SET_ACTIVE_ALERTS",
    payload: activeAlerts,
  };
};

export const updateAlertsAfterSubmit = (updateAlertsAfterSubmitState) => {
  return {
    type: "UPDATE_ALERTS_AFTER_SUBMIT",
    payload: updateAlertsAfterSubmitState,
  };
};
