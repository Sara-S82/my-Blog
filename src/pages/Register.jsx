import React , {useState} from 'react';
import {
  Button,
  Input,
  Grid,
  Box,
  Container,
} from '@mui/material';
import axios from 'axios';

export default function Register() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [password_confirmation,setPassword_confirmation]=useState('')
    const [error,setError]=useState('')
      const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const handleSubmit = async (event) => {
     event.preventDefault();
    const form={
        name,email,
        password
        ,password_confirmation
    }
console.log('form: ',form);

    try{
        const res= await axios.post("https://blog.ahmadreza.dev/api/register",form, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
        
        console.log('register');
        
    }
   catch(err) {
  if (err.response) {
    console.log('Response status:', err.response.status);
    console.log('Response headers:', err.response.headers);
    console.log('Response data:', err.response.data);  // اینجا پیام دقیق خطای سرور هست
  } else if (err.request) {
    console.log('No response received:', err.request);
  } else {
    console.log('Error setting up request:', err.message);
  }
}

  }
  return (
  <Container
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '60%',
          maxWidth: 300,
          minWidth: 180,
          bgcolor: 'white',
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <Grid container direction="column" spacing={2}>
             <Grid item>
            <Input
              placeholder="Name"
              value={name}
              sx={{ mb: 2, width: '70%', mt: 1 }}
              onChange={(e) => setName(e.target.value)}
              inputProps={{ 'aria-label': 'name', type: 'text' }}
              required
            />
          </Grid>
          <Grid item>
            <Input
              placeholder="Email"
              value={email}
              sx={{ mb: 2, width: '70%', mt: 1 }}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{ 'aria-label': 'Email', type: 'email' }}
              required
            />
          </Grid>

          <Grid item>
            <Input
              placeholder="Password"
              value={password}
              sx={{ mb: 2, width: '70%' }}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ 'aria-label': 'Password', type: 'password' }}
              required
            />
          </Grid>
                <Grid item>
            <Input
              placeholder="Password_Confirmation"
              value={password_confirmation}
              sx={{ mb: 2, width: '70%' }}
              onChange={(e) => setPassword_confirmation(e.target.value)}
              inputProps={{ 'aria-label': 'Password', type: 'password' }}
              required
            />
          </Grid>

          {error && (
            <Grid item>
              <Box sx={{ color: 'red', mb: 1 }}>{error}</Box>
            </Grid>
          )}

          <Grid item>
            <Button
              variant="contained"
              type="submit"
              sx={{ mb: 2, width: '70%' }}
              disableElevation
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
