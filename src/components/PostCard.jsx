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
  Button,
  Menu,
  MenuItem,
  Modal
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { makeRequest } from "../sevices/makeRequest";
import { Alert } from "@mui/joy";
import UpdatePostForm from "../pages/UpdatePost";
import DeletePost from "../Modal/DeletePost"
import BlogDetails from "../pages/BlogDetails"
const PostCard = ({ blog, token = null }) => {
  const navigate = useNavigate();
  const [like, setLike] = useState(blog.is_liked_by_user);
  const [isLoggedin] = useState(Boolean(localStorage.getItem("token")));
  const [likecount, setLikecount] = useState(blog.likes_count);
  const [loginalert, setLoginalert] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [postblog, setPostblog] = useState(blog);
  const [openeditmodal, setOpeneditmodal] = useState(false);
  const [opendeletmodal, setopendeletmodal] = useState(false)
  const handleOpeneditmodal = (e) => {
    e.stopPropagation()
    setOpeneditmodal(true);
  }

  const handleCloseeditmodal = (e) => {
    e.stopPropagation()
    setOpeneditmodal(false);
    setAnchorEl(null);
  };
  const handelclosedelemodal = (e) => {
    e.stopPropagation()
    setopendeletmodal(false)
    setAnchorEl(null);
  }
  const closealert = (e) => {
    e.stopPropagation()
    setLoginalert(false);
  };

  const likeBlog = async (e) => {
    e.stopPropagation()
    if (!isLoggedin) {
      setLoginalert(true);
      return;
    }
    setLike(!like);
    const temp = !like ? likecount + 1 : likecount - 1;
    setLikecount(temp);

    try {
      await makeRequest(`/blogs/${blog.id}/like`, "POST", null, token);
    } catch (err) {
      console.log(err);
    }
  };

  const commentblog = async (e) => {
    e.stopPropagation()
    if (!isLoggedin) {
      setLoginalert(true);
      return;
    }
    try {
      await makeRequest(`/blogs/${blog.id}/comments`, "GET", null, token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMenuOpen = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (e) => {
    e.stopPropagation()
    setAnchorEl(null);
  };

  return (
    <>
      <Snackbar
        open={loginalert}
        autoHideDuration={3000}
        onClose={(e) => closealert(e)}
        sx={{ p: 4 }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="secondary"
          sx={{ width: '100%' }}
        >
          Please login to comment and like
          <Button onClick={(e) => {
            e.stopPropagation()
            navigate('/login')
          }}>Login</Button>
        </Alert>
      </Snackbar>

      <Card
        onClick={() => {
          console.log(blog);
          navigate(`/post/${blog.slug}`)
        }}

        sx={{
          width: "100%",
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
            token ? (
              <>
                <IconButton
                  aria-label="settings"
                  onClick={(e) => handleMenuOpen(e)}
                  size="medium"
                  sx={{
                    color: 'text.secondary',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    },
                  }}
                >
                  <MoreVertIcon fontSize="medium" />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 8,
                    sx: {
                      borderRadius: 2,

                      boxShadow:
                        '0 4px 20px rgba(0,0,0,0.12), 0 7px 10px rgba(0,0,0,0.15)',
                      py: 1,
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpeneditmodal(true);
                      handleMenuClose(e);
                    }}

                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      setopendeletmodal(true)
                      handleMenuClose(e)
                    }}

                  >
                    Delete
                  </MenuItem>
                </Menu>
                <DeletePost id={blog.id} open={opendeletmodal} onClose={(e) => handelclosedelemodal(e)} />
                <Modal
                  open={openeditmodal}
                  onClose={(e) => handleCloseeditmodal(e)}
                  disableEnforceFocus={false}
                >
                  <Box
                    onClick={() => {
                      console.log(blog);
                      navigate(`/post/${blog.slug}`)
                    }}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: { md: '70%', sx: '100%' },
                      bgcolor: 'background.paper',
                      m: { sx: 5 },
                      boxShadow: 24,
                      p: 4,
                      borderRadius: 2,
                    }}
                  >
                    <UpdatePostForm
                      token={token}
                      initialData={postblog}
                      closemodal={(e) => handleCloseeditmodal(e)}
                    />
                  </Box>
                </Modal>
              </>) : null
          }
          title={blog.user.name}
          subheader={new Date(blog.created_at).toDateString()}
        />
        <Box
          component="img"
          src={blog.cover_image || "/writing.jpg"}
          alt={blog.title}
          sx={{
            height: 194,
            width: '100%',
            objectFit: 'contain',
            borderRadius: 2,
          }}
        />


        <CardContent
          sx={{
            flexGrow: 1,
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

            <IconButton onClick={(e) => commentblog(e)} aria-label="comments">
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2">{blog.comments?.length || 0}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={(e) => likeBlog(e)} aria-label="like">
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
