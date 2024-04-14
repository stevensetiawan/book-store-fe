// NotificationSnackbar.tsx

import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertSlotsAndSlotProps } from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { hideMessage } from '../../../redux/reducers/notification';
import { AppState } from '@/redux/store';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function NotificationSnackbar() {
  const dispatch = useDispatch();
  const message = useSelector((state: AppState) => state.notification.message);

  const handleClose = (event: React.SyntheticEvent<Element, Event>, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideMessage());
  };

  return (
    <Snackbar open={!!message} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
}
