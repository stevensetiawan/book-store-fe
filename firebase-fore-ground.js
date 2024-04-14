'use client'
import {useFcmToken} from "./src/hooks/use-fcm-token";
import { getMessaging, onMessage } from 'firebase/messaging';
import firebaseApp from './firebase'
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function FcmTokenComp() {
  const { notificationPermissionStatus } = useFcmToken();
  const [notif, setNotif] = React.useState(null)
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (notificationPermissionStatus === 'granted') {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload) => {
          console.log('Foreground push notification received:', payload)
          setNotif(payload?.notification)
          setState(p => {
            return {
              ...p, 
              open: true
            }
          })
        });
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event on cleanup
        };
      }
    }
  }, [notificationPermissionStatus]);
  if (!notif) return null
  return (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={notif?.body}
        key={vertical + horizontal}
      />
  ); // This component is primarily for handling foreground notifications
}