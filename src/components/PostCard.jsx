import React, { useState } from "react";
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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { makeRequest } from "../sevices/makeRequest";

const PostCard = ({ blog }) => {
  const[like,setLike]=useState(false)
  const[comment,setComment]=useState(false)
  const likeBlog=async()=>{
    console.log('blog: ',blog);
    
    setLike(true)
  
    try{
      const data={
        is_liked_by_user:true,
        likes_count:blog.like_count+1
      }
      const res=await makeRequest(`/blogs/${blog.id}/like`,"POST",data,null)


    }catch(err){
console.log(err);

    }
  }

    const commentblog=async()=>{
    console.log('blog: ',blog);
    
    setLike(true)
  
    try{
      const data={
        is_liked_by_user:true,
        likes_count:blog.like_count+1
      }
      const token = localStorage.getItem("token");
      const res=await makeRequest(`/blogs/${blog.id}/like`,"POST",data,token)


    }catch(err){
console.log(err);

    }
  }
  return (
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

          <IconButton aria-label="comments">
            <ChatBubbleOutlineIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">{blog.comments?.length || 0}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={()=>likeBlog()} aria-label="like">
            <FavoriteIcon 
              sx={{ color: blog.is_liked_by_user ? "red" : "inherit" }}
            />
          </IconButton>
          <Typography variant="body2">{blog.likes_count}</Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;
