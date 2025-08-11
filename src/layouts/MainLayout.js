import React from 'react';
import { Box, Container, Typography, AppBar, Toolbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function AuthLayout({ children }) {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                bgcolor: '#f9f9f9',
                m: 0,
                p: 0,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Navbar */}
            <AppBar position="static" sx={{ bgcolor: '#C62828', m: 0, p: 0 }}>
                <Toolbar sx={{ px: 2 }}>
                    <Typography variant="h6" noWrap component="div" onClick={() => navigate('/')} sx={{ cursor: 'pointer', display: { xs: 'block' } }}>
                        My Blog
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    width: '100%',
                    height: '100%',
                }}
            ></Box>
            {children}
        </Box>
    );
}