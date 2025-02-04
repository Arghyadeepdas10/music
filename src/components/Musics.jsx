import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from 'uuid';
import { useAudio } from '../Context/MusicProvider'
import { Button, Input, Paper, Typography } from '@mui/material'
import jsmediatags from "jsmediatags/dist/jsmediatags.min.js";
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Musics = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const[musicPreview, setMusicPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { addmusic } = useAudio();

    // const onSubmit = (data) => {
    //     const uploadmusic = {
    //     id: uuidv4(), 
    //     url: URL.createObjectURL(data.musicFile[0]),
    //     thumbnail: imagePreview || "https://i.pinimg.com/736x/26/30/35/263035ac32db539bde41ed51f766ea18.jpg",
    //     title: data.musicName,
    //   };
    //   addmusic(uploadmusic);
    //   navigate("/musics"); 
    //   };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file && file.type.startsWith("audio/")) 
    //       {
    //         setMusicPreview(URL.createObjectURL(file));
    //         setValue("musicName", file.name.split(".")[0]); 
    //         jsmediatags.read(file, {
    //           onSuccess: (tag) => {
    //               const picture = tag.tags.picture;
    //               if (picture) {
    //                   const base64String = picture.data.map((byte) => String.fromCharCode(byte)).join("");
    //                   const imageUrl = `data:${picture.format};base64,${btoa(base64String)}`;
    //                   setImagePreview(imageUrl); // Set the extracted thumbnail
    //               } else {
    //                   setImagePreview("https://i.pinimg.com/736x/26/30/35/263035ac32db539bde41ed51f766ea18.jpg"); 
    //               }
    //           },
    //           onError: () => {
    //               setImagePreview("https://i.pinimg.com/736x/26/30/35/263035ac32db539bde41ed51f766ea18.jpg"); 
    //           },
    //       });

    //       } 
    //     else {
    //         alert("Please upload a valid music file.");
    //         setMusicPreview(null);
    //         setImagePreview(null);
    //         setValue("musicFile", null);
    //     }
    // };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.type.startsWith("audio/")) {
            setMusicPreview(URL.createObjectURL(file));
            setValue("musicFile", file, { shouldValidate: true });
            setValue("musicName", file.name.split(".")[0]);

            jsmediatags.read(file, {
                onSuccess: (tag) => {
                    const picture = tag.tags.picture;
                    if (picture) {
                        const base64String = picture.data.map((byte) => String.fromCharCode(byte)).join("");
                        const imageUrl = `data:${picture.format};base64,${btoa(base64String)}`;
                        setImagePreview(imageUrl);
                    } else {
                        setImagePreview("https://i.pinimg.com/736x/26/30/35/263035ac32db539bde41ed51f766ea18.jpg");
                    }
                },
                onError: () => {
                    setImagePreview("https://i.pinimg.com/736x/26/30/35/263035ac32db539bde41ed51f766ea18.jpg");
                },
            });
        } else {
            alert("Please upload a valid music file.");
            setMusicPreview(null);
            setImagePreview(null);
            setValue("musicFile", null);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'audio/*' });

    const onSubmit = (data) => {
        const uploadmusic = {
            id: uuidv4(),
            url: URL.createObjectURL(data.musicFile),
            thumbnail: imagePreview || "https://i.pinimg.com/736x/26/30/35/263035ac32db539bde41ed51f766ea18.jpg",
            title: data.musicName,
        };
        addmusic(uploadmusic);
        navigate("/musics");
    };
    
  return (
    <>
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto"}}>
          <h2 className='text-3xl text-center text-red-500'>Upload and Edit Music</h2>
          <br /><br />
          <form onSubmit={handleSubmit(onSubmit)} style={{boxShadow:"0px 0px 8px gray", padding: "15px"}}>
                  {/* <label>
                      <strong>Upload Audio:</strong>
                      <Button variant='contained' className='text-white bg-red-500'>
                      <input
                          type="file"
                          {...register("musicFile", {
                              required: "Music file is required.",
                              validate: (files) =>  files[0]?.type.startsWith("audio/") || "Only audio files are allowed."
                             })}
                          onChange={handleFileChange}  />
                      </Button>      
                  </label> */}
                  
                  <div {...getRootProps()} style={{ marginTop: "10px", textAlign: "center", cursor: "pointer" }}>
                    <label><strong>Upload Audio:</strong></label>
                    <input {...getInputProps()} />
                    <Paper
                    sx={{
                        p: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        bgcolor: isDragActive ? '#f0f0f0' : 'white',
                        border: '2px dashed #ccc',
                        display: 'inline-block'
                    }}
                    >
                    <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                    <Typography variant="h6">    {isDragActive ? 'Drop video here' : 'Drag & drop video or click to select'} </Typography>
                    </Paper>
                  {errors.musicFile && <p style={{ color: "red" }}>{errors.musicFile.message}</p>}
              </div>
              
              {imagePreview && (
                    <div style={{ marginTop: "20px" }}>
                        <h3>Thumbnail Preview:</h3>
                        <img
                            src={imagePreview}
                            alt="Thumbnail Preview"
                            style={{ width: "200px", height: "200px", objectFit: "cover" }}
                        />
                    </div>
                )}

                  <div style={{ marginTop: "20px" }}>
                      <label>  <strong>Edit Music Name:</strong>
                          <Input
                              type="text"
                              {...register("musicName")}
                              style={{  marginLeft: "10px",  padding: "1px",  width: "70%",  color:"black", backgroundColor:"white"  }}  />
                      </label>
                      {errors.musicName && <p style={{ color: "red" }}>{errors.musicName.message}</p>}
                  </div>
              {musicPreview && (
                  <div style={{ marginTop: "20px" }}>
                      <h3>Music Preview:</h3>
                      <audio controls width="100%" src={musicPreview} />
                  </div>
              )}
                  <div style={{ marginTop: "20px" }}>
                    <Button type="submit" variant='contained' style={{ padding: "8px" }}>  Submit  </Button>
                  </div>
          </form>
      </div>
    </>
  )
}

export default Musics