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
                width: '100%',
                height: 'auto',
                bgcolor: '#f9f9f9',
                m: 0,
                p: 0,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <AppBar position="static" sx={{ bgcolor: '#C62828', m: 0, p: 0 }}>
                <Toolbar sx={{ px: 2 }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => navigate('/')}
                        sx={{ cursor: 'pointer', display: { xs: 'block' } }}
                    >
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
                    height: '100vh',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: { xs: 2, sm: 4 },
                        py: { xs: 2, sm: 4 },
                        width: { xs: '100%', md: '50%' },
                        height: '100vh'
                    }}
                >
                    <Box sx={{ alignSelf: 'flex-start' }}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/')}
                            sx={{
                                textTransform: 'none',
                                color: '#555',
                                fontWeight: 500,
                                '&:hover': {
                                    color: '#000',
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            Back
                        </Button>
                    </Box>
                    {children}
                </Box>

                <Box
                    component="img"
                    src="/blog.avif"
                    alt="Auth visual"
                    sx={{
                        width: { xs: '100%', md: '50%' },
                        height: { xs: 'auto', md: '100vh' },  // اضافه شد
                        objectFit: 'contain',
                        display: { xs: 'none', md: 'block' },
                    }}
                />
            </Box>
        </Box>

    );
}
