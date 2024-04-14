import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MyApp() {
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState({});

  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', (event) => {
      setNotification(event.data);
      setOpen(true);
    });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="info">
        {notification.title}: {notification.body}
      </Alert>
    </Snackbar>
  );
}
