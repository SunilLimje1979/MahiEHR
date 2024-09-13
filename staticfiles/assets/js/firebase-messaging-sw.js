importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyACnXUH--J6ilLc-IXaUMNrxtNZBGlAwBk",
    authDomain: "hareshvegad-aa6fd.firebaseapp.com",
    projectId: "hareshvegad-aa6fd",
    storageBucket: "hareshvegad-aa6fd",
    messagingSenderId: "807973311510",
    appId: "1:807973311510:web:286ccb97abe014cfe09137",
    measurementId: "G-QP5WY1QJBK"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        data: payload.data // Include the data payload
    };

    let notificationImage = payload.notification.image;
    notificationImage = notificationImage.replace("/home/kukudkuadmin/admin_collections/staticfiles", "https://www.kukudku.in/static");

    notificationOptions.icon = notificationImage; // Add the image URL to the notification options

    console.log(notificationImage);

    self.registration.showNotification(notificationTitle, notificationOptions);
});


self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    if (event.notification.data && event.notification.data.url) {
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    }
});
