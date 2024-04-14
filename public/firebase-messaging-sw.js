// import * as React from 'react';
// import Snackbar from '@mui/material/Snackbar';

// // eslint-disable-next-line no-undef
// importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// // eslint-disable-next-line no-undef
// importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

// const firebaseConfig = {
//   apiKey: "AIzaSyDa6dL31mGbWADPe41b-2pB7Z8X9xCyq14",
//   authDomain: "argon-firebase-fc798.firebaseapp.com",
//   projectId: "argon-firebase-fc798",
//   storageBucket: "argon-firebase-fc798.appspot.com",
//   messagingSenderId: "403920125858",
//   appId: "1:403920125858:web:2f691caee98c72ce09fcfb",
//   measurementId: "G-1CGNPTC370"
// };

// // eslint-disable-next-line no-undef
// firebase.initializeApp(firebaseConfig);
// // eslint-disable-next-line no-undef
// const messaging = firebase.messaging();

// self.addEventListener('message', event => {
//   const { title, body } = event.data;
//   self.registration.showNotification(title, {
//     body: body,
//     icon: '/icon.png',
//   });
// });

// messaging.onBackgroundMessage((payload) => {
//   const { title, body } = payload.notification;
//   self.clients.matchAll().then(clients => {
//     clients.forEach(client => {
//       client.postMessage({ title, body });
//     });
//   });
// });
