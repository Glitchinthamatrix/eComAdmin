import * as React from 'react';
import {IconButton,Snackbar} from '@material-ui/core';
import {Close} from '@material-ui/icons';

export default function SimpleSnackbar({open,setOpen,message}) {


  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}