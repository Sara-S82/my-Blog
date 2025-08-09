import React, { useState } from "react";
import axios from "axios";
import {Button,Container, Typography,TextField,Box} from '@mui/material'
import { Description } from "@mui/icons-material";
import { useAuth } from "../context/AuthoContext";
import { makeRequest } from "../sevices/makeRequest";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover_image, setcover_image] = useState(null);
    const navigate = useNavigate();

const {user}=useAuth()
  const handleSubmit = async (e) => {
    console.log('creating');
    
    e.preventDefault();
    
    const token=localStorage.getItem("token");
  const post_formData=new FormData()
  post_formData.append("title", title);
post_formData.append("description", description);
if (cover_image) {
  post_formData.append("cover_image", cover_image);
}
    try {
      const response = await makeRequest("/blogs","POST",post_formData,token)
      

      console.log("Blog created:", response.data);
      alert("Blog created successfully!");
     
    } catch (error) {
      console.error(error);
      alert("Failed to create blog post");
    }

    console.log('created');
    console.log("token: ",token);
    
    //navigate('/')
    
  };

  return (
    <Container     maxWidth='false'
      sx={{
        width:'100%',
        height: '100vh',
        bgcolor: '#f9f9f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}>
      
      <Box onSubmit={handleSubmit} component={'form'}   sx={{
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
        autoComplete="off">
        <Typography>
          Create a New Post
        </Typography>
  
        <TextField
          label="title"
          type="text"
          fullWidth
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
                <TextField
          label="Description"
          type="text"
          fullWidth
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />


            <TextField
        
          type="file"
            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
          
   
        
          onChange={(e) => setcover_image(e.target.files[0])}
      
        />

      

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
                Create Post
              </Button>
      </Box>
    </Container>
  );
}

export default CreatePost;
