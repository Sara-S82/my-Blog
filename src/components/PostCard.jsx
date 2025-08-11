import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Snackbar,
  Button
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { makeRequest } from "../sevices/makeRequest";
import { Alert } from "@mui/joy";

const PostCard = ({ blog }) => {
  const navigate =useNavigate()
  const[like,setLike]=useState(blog.is_liked_by_user)

  const [isLoggedin,setIsloggedin]=useState(Boolean(localStorage.getItem("token")))
  const [likecount,setLikecount]=useState(blog.likes_count);
  const [loginalert,setLoginalert]=useState(false)
  const closealert=()=>{
    setLoginalert(false)
  }
     const token = localStorage.getItem("token");
  console.log(likecount);
  
  const[comment,setgetComment]=useState(false)
  const likeBlog=async()=>{


  if(!isLoggedin)  {

    setLoginalert(true)
return
  }
    
    setLike(!like)
    const temp=!like?likecount+1:likecount-1;
    console.log('temp: ',temp);
    
  setLikecount(temp)

    try{
     
      
   
      console.log('token: ',token);
      const res=await makeRequest(`/blogs/${blog.id}/like`,"POST",null,token)
    console.log('blog: ',res.data);

    }catch(err){
console.log(err);

    }
  }

    const commentblog=async()=>{
    if(!isLoggedin)  {

  setLoginalert(true)

return
  }
    
    
    setgetComment(true)
  
    try{
      const data={
        liked:true,
        likes_count:blog.like_count+1
      }
   
      
      const res=await makeRequest(`/blogs/${blog.id}/comments`,"GET",null,token)


    }catch(err){
console.log(err);

    }
  }
  return (
    <>
            <Snackbar
              open={loginalert}
              autoHideDuration={3000}
             onClose={closealert}
            sx={{p:4}}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert
                icon={<CheckIcon fontSize="inherit" />}
                severity="secondary"
                sx={{ width: '100%' }}
              >
              please login to comment and like
              <span>
                <Button onClick={()=>navigate('/login')}>Login</Button>
              </span>
              </Alert>
            </Snackbar>
 
    <Card 
      sx={{ 
       width:"100%", 
        boxShadow: 3, 
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 450,
      }}
    >

      <CardHeader
        avatar={<Avatar>{blog.user.name.charAt(0)}</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={blog.user.name}
        subheader={new Date(blog.created_at).toDateString()}
      />

      <CardMedia
        component="img"
        height="194"
        image={ "/writing.jpg"||blog.cover_image}
        alt={blog.title}
      />

      <CardContent
        sx={{ 
          flexGrow:1,
          overflow: 'hidden',
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontStyle: "italic" }}>
          {blog.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {blog.description}
        </Typography>
      </CardContent>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 1,
        mb: 1
      }}>
        <Box sx={{
          borderTop: '1px solid #E5E5E5',
          width: '80%',
        }} />
      </Box>

      <CardActions
        disableSpacing
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton aria-label="views">
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">{blog.views_count || 0}</Typography>

          <IconButton onClick={()=>commentblog()} aria-label="comments">
            <ChatBubbleOutlineIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">{blog.comments?.length || 0}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={()=>likeBlog()} aria-label="like">
            <FavoriteIcon 
              sx={{ color: like ? "red" : "inherit" }}
            />
          </IconButton>
          <Typography variant="body2">{likecount}</Typography>
        </Box>
      </CardActions>
    </Card>
       </>
  );
};

export default PostCard;
