import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Avatar, Typography, Badge, Box, TextField, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { makeRequest } from '../sevices/makeRequest';

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProfile = async () => {
      try {
        const res = await makeRequest("/me", "GET", null, token);
        const myuser = res.data.user;
        setUser(myuser);
        setFormData({
          name: myuser.name || '',
          email: myuser.email || '',
          password: '',
          password_confirmation: '',
        });
      } catch (err) {
        console.log('error', err);
      }
    };
    fetchProfile();
  }, []);

  const handleEditToggle = (e) => {
e.preventDefault()
    if (isEditing) {
      // Save action
      handleSave();
    } else {
      // Switch to edit mode
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      // Prepare data to send (excluding empty password fields)
      const dataToSend = {
        name: formData.name,
        email: formData.email,
      };
      if (formData.password) {
        dataToSend.password = formData.password;
        dataToSend.password_confirmation = formData.password_confirmation;
      }

      const res = await makeRequest("/update-profile", "PUT", dataToSend, token);

      setUser(res.data.user);  // update user data from server response
      setIsEditing(false);
      setFormData(prev => ({
        ...prev,
        password: '',
        password_confirmation: '',
      }));
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          height: '100vh',
        }}
      >
        {/* Sidebar */}
        <Box sx={{ flex: 1, width: { xs: '100%', md: '30%' }, bgcolor: '#eee', p: 2 }}>
          <Card sx={{ maxWidth: 300, textAlign: "center", p: 2, margin: 'auto' }}>
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Badge
                overlap="circular"
                badgeContent={<EditIcon sx={{ fontSize: 20, color: "#ddd3d6ff" }} />}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Avatar sx={{ width: 100, height: 100, bgcolor: "#cb2756ff", margin: "auto" }}>
                  <PersonIcon sx={{ fontSize: 60, color: "white" }} />
                </Avatar>
              </Badge>
            </Box>
            <CardContent>
              <Typography variant="h6" component="div">
                {user?.name || 'Loading...'}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Main Content */}
        <Box sx={{ width: { xs: '100%', md: '70%' }, bgcolor: '#fff', p: 4 }}>
          <Typography variant="h5" mb={2}>
            Profile Information
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              sx={{ flex: '1 1 45%' }}
              size="small"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              sx={{ flex: '1 1 45%' }}
              size="small"
              type="email"
            />
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditing}
              sx={{ flex: '1 1 45%' }}
              size="small"
              type="password"
              placeholder={isEditing ? "" : "********"}
            />
            <TextField
              label="Confirm Password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              disabled={!isEditing}
              sx={{ flex: '1 1 45%' }}
              size="small"
              type="password"
              placeholder={isEditing ? "" : "********"}
            />
      
            
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                           onClick={(e)=>handleEditToggle(e)}
                      sx={{
                        m:1,
                        borderRadius: 3,
                        textTransform: 'none',
                        fontWeight: 600,
                        bgcolor: '#e60023',
                        '&:hover': { bgcolor: '#b0001a' },
                        boxShadow: '0 4px 15px rgba(230, 0, 35, 0.4)',
                      }}
                    >
                {isEditing ? "Save" : "Edit"}
                    </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
