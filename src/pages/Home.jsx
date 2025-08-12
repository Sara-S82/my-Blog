import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Pagination,
  Grid
} from '@mui/material';
import {  Tabs, Tab,  } from "@mui/material";
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import { makeRequest } from '../sevices/makeRequest';
import UpdatePost from './UpdatePost';
const TabPanel=({ children, value, index }) =>{
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`tab-${index}`}
      id={`tabpanel-${index}`}
    >
      {value === index && (
   
          <Typography sx={{ p: 3 }}>{children}</Typography>
        
      )}
    </div>
  );
}

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [myblogs, setMyBlogs] = useState([]);

  const [page, setPage] = useState(1);
  const [value, setValue] = useState(0);

  const handleChangemenu = (event, newValue) => {
    setValue(newValue);
  };

  const postsPerPage = 8;
console.log('logged in: ',localStorage.getItem("token"));
const token=localStorage.getItem("token");
  useEffect(() => {
    const fetchProfile = async () => {
      console.log(token);
      
     
      try {
        const res = await makeRequest("/my-blogs", "GET",null,token);
        const Blogs = res.data;
        setMyBlogs(Blogs);
      } catch (err) {
        console.log('getting my blogs : ', err);
      }
console.log('my blogs',myblogs);

    
      try {
        const res = await makeRequest("/blogs", "GET");
        const Blogs = res.data;
        setBlogs(Blogs);
      } catch (err) {
        console.log('error', err);
      }
    };
    fetchProfile();
  },[]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * postsPerPage;
  const currentPosts = blogs.slice(startIndex, startIndex + postsPerPage);
  const currentmyPosts = myblogs.slice(startIndex, startIndex + postsPerPage);

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
 <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChangemenu}
        aria-label="blog menu tabs"
        centered
      >
        <Tab label="Home" id="tab-0" aria-controls="tabpanel-0" />
        {token&&<Tab label="My Posts" id="tab-1" aria-controls="tabpanel-1" />}
      </Tabs>

      <TabPanel value={value} index={0}>
    <Box sx={{ py:3 }}>
      
         
          <Grid container sx={{px:2,py:4}} spacing={1} justifyContent="center">
            {currentPosts.map((blog) => (
              <Grid item xs={12} sm={6} md={2}  sx={{ width: '100%', maxWidth: 345, mx: 'auto', mb:{xs:6,sm:4} }} key={blog.id}>
                <PostCard blog={blog} blogData={blog.data} />
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
      </TabPanel>

      <TabPanel value={value} index={1}>


   <Box sx={{ py:3 }}>
      
         
          <Grid container sx={{px:2,py:4}} spacing={1} justifyContent="center">
            {/* currentPosts */}
            {currentmyPosts.map((blog) => (
              <Grid item xs={12} sm={6} md={2}  sx={{ width: '100%', maxWidth: 345, mx: 'auto', mb:{xs:6,sm:4} }} key={blog.id}>
                <PostCard blog={blog} token={token} />
                {
                  console.log('token in home: ',token)
                  
                }
              </Grid>
            ))}
          </Grid>

      
          {
        
          myblogs.length > postsPerPage && (
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
                count={Math.ceil(myblogs.length / postsPerPage)}
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

     </TabPanel>
 
    </Box>
  
      </Container>
    </>
  );
}

export default Home;
