     import React from 'react';
     import {Snackbar ,Alert}  from "@mui/material";
     import CheckIcon from '@mui/icons-material/Check';
     
     function AlertModal({success,message,closeAlert,type='success'}) {
       return (
      <Snackbar
          open={success}
          autoHideDuration={1000}
          onClose={()=>closeAlert()}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity={type}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
       );
     }
     
     export default AlertModal;
     
     
    