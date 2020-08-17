const initialState = { metrics: [] };

export default (state = initialState, action) => {
  if (action.type === "SET_METRICS_DATA") {
    return {
      ...state,
      metrics: action.payload,
    };
  }

  return state;
};

export const setMetricData = (state) => state.metricReducer.metrics;
