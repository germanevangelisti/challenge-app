// Las acciones siempre tienen la estructura { type, payload }
export const setAlertNotification = (activeAlerts) => {
    return {
        type: 'SET_ACTIVE_ALERTS',
        payload: activeAlerts
    }
};