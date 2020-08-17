import { createStore, combineReducers } from "redux";
import alertsReducer from "./alert/reducer";
import alertSearchReducer from "./alert/reducer";
import alertNotificationReducer from "./alert/reducer";
import updateAlertsReducer from "./alert/reducer";
import metricReducer from "./metric/reducer";
import sourceReducer from "./source/reducer";
import modalReducer from "./modal/reducer";

const reducers = combineReducers({
  alertsReducer,
  alertSearchReducer,
  alertNotificationReducer,
  updateAlertsReducer,
  metricReducer,
  sourceReducer,
  modalReducer,
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
