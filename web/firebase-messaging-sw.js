
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyA0KkmpW6cUDA-lRz9Bwe-cWi5JGkFiqVs',
  authDomain: 'lab7-flutter-80f8e.firebaseapp.com',
  projectId: 'lab7-flutter-80f8e',
  storageBucket: 'lab7-flutter-80f8e.firebasestorage.app',
  messagingSenderId: '253372810472',
  appId: '1:253372810472:web:1e37d248ebd9b81843f55d'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Новое уведомление';
  const options = {
    body: payload.notification?.body || 'У вас новое сообщение',
  };

  self.registration.showNotification(title, options);
});
self.addEventListener('push', (event) => {
  let data = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'Тестовое уведомление', body: event.data.text() };
    }
  }

  const title = data.notification?.title || data.title || 'Тестовое уведомление';
  const options = {
    body: data.notification?.body || data.body || 'Service Worker работает!',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});