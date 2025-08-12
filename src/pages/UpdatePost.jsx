import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { makeRequest } from "../sevices/makeRequest";
import AlertModal from "../Modal/AlertModal";
export default function UpdatePostForm({ initialData = {},token=null ,closemodal}) {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.description || "");
  const [success, setSuccess] = useState(false);
 const [Type,setType]=useState('success')

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData.cover_image || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [message,setMessage]=useState('')
  const closeAlert = () => {
    setSuccess(false);
    navigate('/');
  };
 const navigate =useNavigate()
const onclose=()=>{
  closemodal();
}
  const handleChangeImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    const mytoken = token;
    const post_formData = new FormData();
    post_formData.append("title", title);
    post_formData.append("description", content);
    console.log("description", content);
    console.log('updated id: ',initialData.id);
  
    if (imageFile) {
      post_formData.append("cover_image", imageFile);
    }
    console.log('post_formData',post_formData);
    
    try {
      const response = await makeRequest(`/blogs/${initialData.id}`, "PUT", post_formData, mytoken);

      console.log("Blog updated:", response);
   setSuccess(true);
   setMessage("Post updated successfully")
    setTimeout(()=>{
      onclose()
    },1000)

    } catch (error) {
      console.error(error);
      console.log(error.message);
         setSuccess(true);
   setMessage("Failed to update the post. Please try again")
   setType('error')
       setTimeout(()=>{
      onclose()
    },1000)
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: 1000,
        margin: "24px auto",
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(250,250,252,0.95))",
      }}
    >
         <AlertModal message={message} type={Type} closeAlert={closeAlert} success={success}/>
      <Typography variant="h5" mb={2} sx={{ fontWeight: 700 }}>
        Edit Post
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Stack spacing={2}>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
                placeholder="Post title..."
                inputProps={{ maxLength: 150 }}
              />

              <TextField
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                multiline
                minRows={8}
                placeholder="Full post content..."
              />

              <Box display="flex" gap={2} alignItems="center">
                <TextField
                  label="Reading Time (min)"
                 
                  type="text"
                  sx={{ width: 160 }}
                />
                <Typography color="text.secondary" variant="body2">
                  (At least 1 minute — auto-calculated from content but editable)
                </Typography>
              </Box>

              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ alignSelf: "flex-start", mt: 1 }}
              >
                {loading ? "Updating..." : "Submit"}
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box
              sx={{
                borderRadius: 2,
                border: "1px solid rgba(0,0,0,0.06)",
                p: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(245,246,250,0.6))",
              }}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  Feature Image
                </Typography>

                <Box
                  sx={{
                    width: "100%",
                    height: 220,
                    borderRadius: 2,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: imagePreview ? "transparent" : "grey.100",
                    border: imagePreview
                      ? "1px solid rgba(0,0,0,0.06)"
                      : "1px dashed rgba(0,0,0,0.04)",
                    mb: 2,
                  }}
                >
                  {imagePreview ? (
                    <Box
                      component="img"
                      src={imagePreview}
                       onFileSelect={imageFile}
                      alt="Preview"
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Typography color="text.secondary">No Image</Typography>
                  )}
                </Box>

                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
                    Change
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleChangeImage}
                    />
                  </Button>

                  {imagePreview && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteOutline />}
                      onClick={handleRemoveImage}
                    >
                      Remove
                    </Button>
                  )}
                </Stack>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="caption" color="text.secondary">
                  • Cover image used for post listings.
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  • After selecting, the preview is displayed here.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
