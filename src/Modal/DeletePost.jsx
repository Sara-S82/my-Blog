import React, { useState } from 'react';
import { Modal, Button, Box, Typography } from "@mui/material";
import { makeRequest } from '../sevices/makeRequest';
import AlertModal from './AlertModal';

const DeleteConfirmation = ({ id = null, open = false, onClose = () => {} }) => {
  const [showsuccess, setshowsuccess] = useState(false);
const [message,setMessage]=useState('')
  const CloseAlert = () => {
    setshowsuccess(false);
    onClose();
  };

  const Delete = async () => {
    try {
      const res = await makeRequest(`/blog/${id}`, "DELETE");
      console.log(res.data);
      setshowsuccess(true);
      setMessage('The post has been deleted successfully')
    } catch (err) {
      console.log(err.message);
      setshowsuccess(true);
      setMessage('Failed to delete the post. Please try again later')
    }
    <AlertModal success={'success'} message={"successfuly deleted"} />
    onClose()
  };

  return (
    <Modal open={open} onClose={()=>onClose()}>
   
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          outline: 'none',
        }}
      >
                <AlertModal
          success={showsuccess}
          closeAlert={CloseAlert}
          message={message}
          type={'error'}
        />
        <Typography variant="h6" gutterBottom>
          Delete Confirmation
        </Typography>

        <Typography sx={{ mb: 2 }}>
          Are you sure you want to delete the post?
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={()=>onClose()}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={Delete}
          >
            Delete
          </Button>
        </Box>

   
      </Box>
    </Modal>
  );
};

export default DeleteConfirmation;
