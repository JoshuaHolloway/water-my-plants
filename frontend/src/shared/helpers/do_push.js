// ==============================================

const register_push = (reg_hr, reg_min) => {
  // --------------------------------------------

  const publicVapidKey =
    'BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo';

  // --------------------------------------------

  // Check for service worker
  if ('serviceWorker' in navigator) {
    send().catch((err) => console.error('serviceWorker error: ', err));
  }

  // --------------------------------------------

  // Register SW, Register Push, Send Push
  async function send() {
    // Register Service Worker
    console.log('Registering service worker...');
    const register = await navigator.serviceWorker.register('/worker.js', {
      scope: '/',
    });
    console.log('Service Worker Registered...');

    // Register Push
    console.log('Registering Push...');
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log('Push Registered...');

    // Send Push Notification
    console.log('Sending Push...');

    await fetch('http://localhost:5000/api/push/', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'content-type': 'application/json',
        Push_reg_hr: String(reg_hr),
        Push_reg_min: String(reg_min),
      },
    });

    console.log('Push Sent...');
  }

  // --------------------------------------------

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // --------------------------------------------
}; // do_push()

// ==============================================

export default register_push;
