import { createStore, combineReducers } from 'redux';
import alertNotificationReducer from './alertNotification/reducer';

const reducers = combineReducers({
    alertNotificationReducer
});

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;