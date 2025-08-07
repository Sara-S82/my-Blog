import React, { useState } from 'react';
import {
  Button,
  Input,
  Grid,
  Box,
  Container,
} from '@mui/material';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

 
    if (!email || !password) {
      setError('ایمیل و پسورد را وارد کنید');
      return;
    }
    if (!validateEmail(email)) {
      setError('فرمت ایمیل اشتباه است');
      return;
    }

    setError(''); 
    const form = { email, password };

    try {
      const res = await axios.post('https://blog.ahmadreza.dev/api/register', form);
      localStorage.setItem('token', res.data.token);
      alert('ورود موفق');
    } catch (err) {
      alert('خطا در ورود: ' + err.message);
    }
  };

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
