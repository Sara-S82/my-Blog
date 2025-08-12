import React, { useState } from "react";
import { Button, Container, Typography, TextField, Box } from "@mui/material";
import { useAuth } from "../context/AuthoContext";
import { makeRequest } from "../sevices/makeRequest";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AlertModal from "../Modal/AlertModal";

const ImportSite = ({ onFileSelect }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    onFileSelect(selectedFile);
  };
  

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    onFileSelect(droppedFile);
  };

  return (
    <Box
      sx={{
        border: "2px dashed #ccc",
        borderRadius: "8px",
        p: 3,
        textAlign: "center",
        maxWidth: 400,
        mx: "auto",
        backgroundColor: "#fff",
        cursor: "pointer",
      }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
        
      {!file ? (
        <>
          <CloudUploadIcon sx={{ fontSize: 50, color: "#888" }} />
          <Typography variant="body1" sx={{ mt: 1 }}>
            Drag & Drop a backup to import it
          </Typography>

          <Button
            variant="outlined"
            component="label"
            sx={{
              mt: 2,
              borderColor: "green",
              color: "green",
              "&:hover": { borderColor: "darkgreen" },
            }}
          >
            IMPORT FROM
            <input type="file" hidden onChange={handleFileChange} />
          </Button>

          <Typography variant="caption" display="block" sx={{ mt: 2, color: "gray" }}>
            Maximum upload file size: 120 MB
          </Typography>
        </>
      ) : (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {file.name}
          </Typography>
          {file.type.startsWith("image/") && (
            <Box
              component="img"
              src={URL.createObjectURL(file)}
              alt="Preview"
              sx={{
                mt: 2,
                maxHeight: 200,
                borderRadius: 2,
                boxShadow: 2,
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover_image, setcover_image] = useState(null);
 const [showsuccess, setshowsuccess] = useState(false);
 const [Type,setType]=useState('success')
 const [success, setSuccess] = useState(false);

  const [message,setMessage]=useState('')
  const navigate=useNavigate();
    const CloseAlert = () => {
      setshowsuccess(false);

    };
  

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const post_formData = new FormData();
    post_formData.append("title", title);
    post_formData.append("description", description);
    if (cover_image) {
      post_formData.append("cover_image", cover_image);
    }
    try {
      const response = await makeRequest("/blogs", "POST", post_formData, token);

      console.log("Blog created:", response.data);
   setType('success')
              setSuccess(true);
   setMessage("successfuly create the post.")

    setTimeout(()=>{ navigate('/')},1000)


    } catch (error) {
      console.error(error);
      console.log(error.message);
              setSuccess(true);
      setType('error')
   setMessage("Failed to update the post. Please try again")
   setTimeout(()=>{ navigate('/')},1000)


    }
  };

  return (
    <MainLayout>
      <Container
        maxWidth={false}
        sx={{
          width: "100%",
          height: "100vh",
          bgcolor: "#f9f9f9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
          <AlertModal
          success={success}
          closeAlert={CloseAlert}
          message={message}
          type={Type}
        />
        <Box
          onSubmit={handleSubmit}
          component={"form"}
          sx={{
            width: "100%",
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            textAlign: "center",
            maxWidth: 600,
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Create a New Post
          </Typography>

          <TextField
            label="Title"
            type="text"
            fullWidth
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            multiline
            minRows={7}
            label="Description"
            type="text"
            fullWidth
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <ImportSite onFileSelect={setcover_image} />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "#e60023",
              fontWeight: 600,
              borderRadius: 3,
              textTransform: "none",
              boxShadow: "0 4px 15px rgba(230,0,35,0.4)",
              "&:hover": { bgcolor: "#b0001a" },
            }}
            disableElevation
            fullWidth
          >
            Create Post
          </Button>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default CreatePost;
