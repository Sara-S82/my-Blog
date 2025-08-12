import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, CircularProgress, Button } from "@mui/material";
import { makeRequest } from "../sevices/makeRequest";

const BlogDetails = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await makeRequest(`/blogs/${id}`, "GET", null, token);
        setPost(response.data);
      } catch (err) {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id, token]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!post) return <Typography>No post found</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        By {post.user.name} | {new Date(post.created_at).toLocaleDateString()}
      </Typography>
      <Box
        component="img"
        src={post.cover_image || "/writing.jpg"}
        alt={post.title}
        sx={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 2, mb: 3 }}
      />
      <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
        {post.description}
      </Typography>
 
    </Container>
  );
};

export default BlogDetails;
