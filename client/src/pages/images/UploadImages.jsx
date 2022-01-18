import "./uploadImages.css";
import React from "react";
import { useState } from "react";
import BasicTable from "./imageTable/ImageTable.jsx";
import {Button,Dialog} from '@material-ui/core';
import axios from "axios";
import { useRef } from "react";
import SimpleSnackbar from "../../components/snackbars/Snackbar.jsx";
require('dotenv').config();
const environ = process.env.NODE_ENV;
const baseUrl = environ === 'production' ? '' : 'http://localhost:9000';

export default function UplaodImages() {
  const [fetchedImages,setFetchedImages]=useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openModal, setOpenModa] = React.useState(false);
  const [selectedImage,setSelectedImage]=React.useState('')
  const [imageCount,setImageCount]=React.useState(0);
  const [perPage,setPerPage]=React.useState(0);

  const getAllImages=()=>{
   axios.get(`${baseUrl}/images`)
   .then((response)=>{
    if(!response.data.error){
      setImageCount(response.data.totalImages);
      setPerPage(response.data.files.length);
      setSnackbarMessage(response.data.files?response.data.files.length>0?`Fetched ${response.data.files.length} Images`:'No images found on server':'Unexpected error')
      setIsSnackbarOpen(true);
      setFetchedImages(response.data.files);
    }else{
      console.log(`error: ${response.data.error}`);
      setSnackbarMessage(`Error: ${response.data.error}`);
      setIsSnackbarOpen(true);
    }
   })
   .catch(err=>{
    setSnackbarMessage(`Error: ${err.message}`)
    setIsSnackbarOpen(true);
   })
  }
  
  const delImage=(filename)=>{
    axios.post(`${baseUrl}/images/deleteImage/${filename}`)
    .then((response)=>{
     if(!response.data.error){
     setSnackbarMessage(response.data.message)
     setIsSnackbarOpen(true);
     getAllImages();
     }else{
       console.log(`error: ${response.data.error}`);
       setSnackbarMessage(`Error: ${response.data.error}`);
       setIsSnackbarOpen(true);
     }
    })
    .catch(err=>{
      console.log('error: ',err)
     setSnackbarMessage(`Error: ${err.message}`)
     setIsSnackbarOpen(true);
    })
  }


  var filesToPush = [];
  function changedInput(e) {
    for (var i = 0; i < fileInputRef.current.files.length; i++) {
      if (
        [
          "image/png",
          "image/jpg",
          "image/jpeg",
          "image/gif",
          "image/bmp",
          "image/tiff",
        ].includes(fileInputRef.current.files[i].type)
      ) {
        filesToPush.push(fileInputRef.current.files[i]);
      } else {
        console.log("gaddar: ", fileInputRef.current.files[i]);
        setSnackbarMessage(
          `Error: ${fileInputRef.current.files[i].name} is not an image`
        );
        setIsSnackbarOpen(true);
        break;
      }
    }
  }

  const handleSubmit = () => {
    console.log("filesToPush: ", filesToPush);
    var fd = new FormData();
    filesToPush.forEach((image) => {
      fd.append("images", image);
    });
    if (typeof filesToPush !== "undefined" && filesToPush.length > 0) {
      setLoading(true);
      axios
        .post(`${baseUrl}/images/uploadImages`, fd, {
          headers: { Accept: "application/json" },
        })
        .then((res) => {
          if (res) {
            console.log("got responded : ", res);
            if (res.data.status === "success") {
              setLoading(false);
              setSnackbarMessage(`Uplaoded ${res.data.noOfFiles} Images Successfully`);
              setIsSnackbarOpen(true);
            } else {
              setLoading(false);
              setSnackbarMessage(`Error: Can't Upload Image`);
              setIsSnackbarOpen(true);
            }
          } else {
            setLoading(false);
            setSnackbarMessage(`Error: Can't Upload Image`);
            setIsSnackbarOpen(true);
            console.log("could not get res", res);
          }
        })
        .catch((e) => {
          setLoading(false);
          setSnackbarMessage(`Error: ${e.message}`);
          setIsSnackbarOpen(true);
          console.log("error: ", e);
        });
    } else {
      setSnackbarMessage("Error: Please Choose The Images To Upload");
      setIsSnackbarOpen(true);
    }
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getAllImages();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  
  const handleClickOpen = () => {
    setOpenModa(true);
  };

  const handleClose = (value) => {
    setOpenModa(false);
  };

  return (
    <div className="container" style={{marginLeft:'20px'}}>
      <SimpleSnackbar 
        perPage={perPage}
        message={snackbarMessage}
        propsAnchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={isSnackbarOpen}
        setOpen={setIsSnackbarOpen}
      />
      <div>
        <h3>Upload New</h3>
        <div className="imageUploadFormContainer">
          <form
            method="POST"
            className="imageUploadForm"
            action={`${baseUrl}/images/uploadImages`}
            enctype="multipart/form-data"
          >
            <input
              onChange={(e) => {
                changedInput(e);
              }}
              ref={fileInputRef}
              multiple
              className="imageUploadInput"
              type="file"
              name="image"
            />
            <button
              className="imageUploadButton"
              onClick={handleSubmit}
              type="button"
            >
              Upload
              {loading ? <span className="fa fa-spinner fa-spin"></span> : ""}
            </button>
          </form>
        </div>
        <div className="imageContainer">
          <h3>Images On The Server</h3>
          <Button style={{marginBottom:'20px'}} variant="contained" onClick={e=>{getAllImages()}}>{fetchedImages.length>0?'Refresh':'Fetch Images'}</Button>
          {fetchedImages.length>0?<BasicTable delImage={delImage} setIsSnackbarOpen={setIsSnackbarOpen} setSnackbarMessage={setSnackbarMessage} setSelectedImage={setSelectedImage} handleModalOpen={handleClickOpen} filenames={fetchedImages} />:''}
        </div>
        <div>
          <Dialog onClose={handleClose} open={openModal}>
            <img style={{borderRadius:'6px'}} src={selectedImage} alt={selectedImage}></img>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
