'use client'
import * as React from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import firebaseApp from '../../firebase';
import axios from 'axios';

export function useFcmToken(){
  const [tokenFCM, setToken] = React.useState('');
  const [token, setLoginToken] = React.useState<string | null>(null);
  const [notificationPermissionStatus, setNotificationPermissionStatus] = React.useState('');
  
  const axiosInstance = React.useMemo(() => 
  axios.create({
    baseURL: 'http://localhost:7009/api/v1/book-store', // Replace with your API base URL
    timeout: 5000, // Request timeout (optional)
    headers: {
      'Content-Type': 'application/json',
      // Add any default headers you need
      'Authorization': `Bearer ${token}`
    },
  }),[token]);
  let payload = {
    tokenfcm: ''
  }
  React.useEffect(() => {
    setLoginToken(localStorage.getItem('custom-auth-token'))
  }, [])

  React.useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Request notification permission
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          if (permission === 'granted') {
            const currentToken = await getToken(messaging, {
              vapidKey: "BCEKzyiAHIjDBjRw4HJ0unn1CDsB0qKZwzkU11TfCzlLyvnvE8MyBYjoVKLhcVNFNocvTHo8pCZBOTOu74Yy7AY", // Replace with your Firebase project's VAPID key
            });
            if (currentToken) {
              setToken(currentToken);
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              payload.tokenfcm = currentToken
              await axiosInstance.put('/token/fcm', payload)
            } else {
              console.log('No registration token available. Request permission to generate one.');
            }
          }
        }
      } catch (error) {
        console.log('Error retrieving token:', error);
      }
    };

    void retrieveToken();
  }, []);

  return { tokenFCM, notificationPermissionStatus };
};