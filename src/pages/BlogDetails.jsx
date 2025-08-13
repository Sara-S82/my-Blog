import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton
} from "@mui/material";
import { makeRequest } from "../sevices/makeRequest";
import MainLayout from "../layouts/MainLayout";
import SendIcon from '@mui/icons-material/Send';
const BlogDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await makeRequest(`/blogs/${slug}`, "GET");
        setPost(response.data);
        setComments(response.data.comments || []);
      } catch (err) {
        setError(`Failed to load post : ${err}`);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  const handleAddComment = () => {
    if (commentText.trim() === "") return;
    // You can replace this with an API call
    const newComment = {
      id: Date.now(),
      text: commentText,
      user: { name: "You" },
      created_at: new Date().toISOString(),
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!post) return <Typography>No post found.</Typography>;

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ display: "flex", p: 3, flexDirection: "column", gap: 2 }}>
        <Typography variant="h4">{post.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          By {post.user.name} | {new Date(post.created_at).toLocaleDateString()}
        </Typography>

        <Box
          component="img"
          src={post.cover_image || "/writing.jpg"}
          alt={post.title}
          sx={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 2 }}
        />

        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          {post.description}
        </Typography>

        {/* Comments section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>

          {/* Comment input form */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Your comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <IconButton
              aria-label="send"
              onClick={handleAddComment}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                p: { xs: 1, sm: 1.5 },
                borderRadius: '8px',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                boxShadow: 2,
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>

          </Box>

          {/* Comments list */}
          <List>
            {comments.length === 0 && (
              <Typography color="text.secondary">No comments yet.</Typography>
            )}
            {comments.map((c) => (
              <ListItem key={c.id} alignItems="flex-start" divider>
                <ListItemText
                  primary={c.user.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {c.text}
                      </Typography>
                      <br />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(c.created_at).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default BlogDetails;
