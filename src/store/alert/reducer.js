const initialState = {
  activeAlerts: 0,
  updateAlertsAfterSubmitState: false,
  alerts: [],
  alertSearchState: false,
};

export default (state = initialState, action) => {
  if (action.type === "SET_ALERTS") {
    return {
      ...state,
      alerts: action.payload,
    };
  }

  if (action.type === "SET_ALERT_SEARCH_STATE") {
    return {
      ...state,
      alertSearchState: action.payload,
    };
  }

  if (action.type === "SET_ACTIVE_ALERTS") {
    return {
      ...state,
      activeAlerts: action.payload,
    };
  }

  if (action.type === "UPDATE_ALERTS_AFTER_SUBMIT") {
    return {
      ...state,
      updateAlertsAfterSubmitState: action.payload,
    };
  }

  return state;
};

export const setAllAlerts = (state) => state.alertsReducer.alerts;
export const searchState = (state) => state.alertSearchReducer.alertSearchState;
export const selectAmountAlertNotification = (state) =>
  state.alertNotificationReducer.activeAlerts;
export const updateAlertsAfterSubmit = (state) =>
  state.updateAlertsReducer.updateAlertsAfterSubmitState;
