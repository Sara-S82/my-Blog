import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Pagination,
  Grid
} from '@mui/material';

import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import { makeRequest } from '../sevices/makeRequest';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 8;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await makeRequest("/blogs", "GET");
        const Blogs = res.data;
        setBlogs(Blogs);
      } catch (err) {
        console.log('error', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * postsPerPage;
  const currentPosts = blogs.slice(startIndex, startIndex + postsPerPage);

  return (
    <>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          width: '100vw',
          minHeight: '100vh',
          backgroundColor: '#f0f4ff',
          margin: 0,
          padding: 0,
        }}
      >
        <Navbar />

        <Box sx={{ py:3 }}>
      
         
          <Grid container sx={{px:2,py:4}} spacing={1} justifyContent="center">
            {currentPosts.map((blog) => (
              <Grid item xs={12} sm={6} md={2}  sx={{ width: '100%', maxWidth: 345, mx: 'auto', mb:{xs:6,sm:4} }} key={blog.id}>
                <PostCard blog={blog}  />
              </Grid>
            ))}
          </Grid>

      
          {blogs.length > postsPerPage && (
            <Stack
              spacing={2}
              sx={{
                alignItems: "center",
                mt: 4,
                '& .MuiPagination-ul': {
                  justifyContent: 'center',
                },
              }}
            >
              <Pagination
                count={Math.ceil(blogs.length / postsPerPage)}
                page={page}
                onChange={handleChange}
                color="#C62828"
                shape="rounded"
                size="large"
                showFirstButton
                showLastButton
              />
            </Stack>
          )}
        </Box>
      </Container>
    </>
  );
}

export default Home;
