const PUBLIC_VAPID_KEY =
  'BDB3oKcPwfoRJanfwSn4O1Be3xxpOgPCKiBZ9DtKbCz7EgcrGKLT5MxasnUqB9EGYLRH5MKxMGhZIYcPYcFoIvQ';
const { urlBase64ToUint8Array } = require("./utils");

export const subscription = async () => {
    // Service Worker
    console.log("Registering a Service worker");
    const register = await navigator.serviceWorker.register("/serviceWorker.js", {
      scope: "/"
    });
    console.log("New Service Worker");

    // Listen Push Notifications
    console.log("Listening Push Notifications");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });

    console.log(subscription);

    // Send Notification
    await fetch("/alertRoute/subscription", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("Subscribed!");
};