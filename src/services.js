const axios = require('axios');
const BASE_URL = 'http://localhost:3000/'

export const postMetricSource = async (params) => {
    let response = await axios.post(BASE_URL + 'metricSource/create', params);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
};

export const getMetricSources = async () => {
    let response = await axios.get(BASE_URL + 'metricSource/')
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
};