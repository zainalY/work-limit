// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log('Service Worker registered!'))
        .catch(err => console.error('SW failed:', err));
}

// Request Notification Permission
function askPermission() {
    if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission !== 'granted') {
                alert('Notifikasi tidak diizinkan');
            }
        });
    }
}

// Show Notification
function showNotification() {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then(reg => {
            reg.showNotification("Halo dari PWA!", {
                body: "Ini adalah notifikasi dari web kamu.",
                icon: "icon-192.png",
                vibrate: [200, 100, 200],
                tag: "simple-notification"
            });
        });
    } else {
        askPermission();
    }
}

document.getElementById('notifyBtn').addEventListener('click', () => {
    askPermission();
    showNotification();
});
