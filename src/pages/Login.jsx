import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Box,
  Container,
  IconButton,
  InputAdornment,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { makeRequest } from '../sevices/makeRequest';
import { Helmet } from 'react-helmet';
import { AuthoContext } from '../context/AuthoContext';
export default function Login({handlelogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success,setSuccess]=useState(false)
  const navigate = useNavigate();
  const {login}=useContext(AuthoContext)
const onLogin=(token)=>{
  handlelogin(token)
}
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const closeAlert=()=>{
  setSuccess(false)
  navigate('/')
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }
    setError('');
    try {
      const res = await makeRequest('/login', 'POST', { email, password });
    
      localStorage.setItem('token', res.data.token);
console.log(localStorage.getItem('token'));

setSuccess(true)
const { user, token } = res.data;
login(user, token);

console.log('data: ',res.data)

      // optionally navigate somewhere on success
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  return (
    <>
        <Helmet>
<title>
  Login
</title>

    </Helmet>
   
    <Container
      maxWidth='false'
      sx={{
        width:'100%',
        height: '100vh',
        bgcolor: '#f9f9f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
<Snackbar
  open={success}
  autoHideDuration={1000}
  onClose={() => {
    closeAlert()}}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // جای‌گذاری در بالای صفحه
>
  <Alert
    icon={<CheckIcon fontSize="inherit" />}
    severity="success"
    sx={{ width: '100%' }}
  >
    Login successful
  </Alert>
</Snackbar>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          width:'full',
          bgcolor: 'white',
          borderRadius: 3,
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          textAlign: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5" fontWeight={600} color="#333" mb={2}>
          Login
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          size="small"
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

        {error && (
          <Typography color="error" variant="body2" mt={-1} mb={1}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: '#e60023',
            fontWeight: 600,
            borderRadius: 3,
            textTransform: 'none',
            boxShadow: '0 4px 15px rgba(230,0,35,0.4)',
            '&:hover': { bgcolor: '#b0001a' },
          }}
          disableElevation
          fullWidth
        >
          Login
        </Button>

        <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1}>
          <Typography variant="body2" color="#666">
            Don't have an account?
          </Typography>
          <Button
            onClick={() => navigate('/register')}
            size="small"
            sx={{
              color: '#e60023',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { backgroundColor: 'transparent', color: '#b0001a' },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
     </>
  );
}
