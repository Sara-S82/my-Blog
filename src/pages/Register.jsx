import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Box,
  Container,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { makeRequest } from '../sevices/makeRequest';
import { Helmet } from 'react-helmet';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      return;
    }
    const form = { name, email, password, password_confirmation: passwordConfirmation };
    try {
      const res = await makeRequest('/register', 'POST', form);
      localStorage.setItem('token', res.token);
      
      navigate('/login');
    } catch {
      setError('An error occurred during registration.');
    }
  };

  return (
    <>
    <Helmet>
<title>
  Sign Up
</title>

    </Helmet>
 
    <Container
      maxWidth="false"
      sx={{
        
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f9f9f9',
        p: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
       
          bgcolor: 'white',
          borderRadius: 3,
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
          textAlign: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5" fontWeight={600} mb={2} color="#333">
          Create Account
        </Typography>

        <TextField
          label="Name"
          variant="outlined"
          size="small"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{
            borderRadius: 2,
          }}
        />

        <TextField
          label="Email"
          variant="outlined"
          size="small"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Password"
          variant="outlined"
          size="small"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirm Password"
          variant="outlined"
          size="small"
          fullWidth
          
          type={showConfirmPassword ? 'text' : 'password'}
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
          error={passwordConfirmation.length > 0 && password !== passwordConfirmation}
          helperText={
            passwordConfirmation.length > 0 && password !== passwordConfirmation
              ? 'Passwords do not match.'
              : ''
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword((show) => !show)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                  aria-label="toggle confirm password visibility"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {error && (
          <Typography color="error" fontSize="0.9rem" mt={-1} mb={1}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          size="medium"
          sx={{
            borderRadius: 3,
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: '#e60023',
            '&:hover': { bgcolor: '#b0001a' },
            boxShadow: '0 4px 15px rgba(230, 0, 35, 0.4)',
          }}
        >
          Sign Up
        </Button>

        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          <Typography variant="body2" color="#666">
            Already have an account?
          </Typography>
          <Button
            onClick={() => navigate('/login')}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: '#e60023',
              '&:hover': { backgroundColor: 'transparent', color: '#b0001a' },
            }}
            size="small"
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
       </>
  );
}
