import React from 'react';
import SingleProduct from './SingleProduct.jsx';
import {Box, Button,Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import './products.css';
import Snackbar from '../../components/snackbars/Snackbar.jsx';
require('dotenv').config();
var baseUrl=process.env.NODE_ENV==="production"?'':'http://localhost:9000';

export default function Products() {
const [excelFiles,setExcelFiles]=useState(null);
const[snackbarOpen,setSnackbarOpen]=useState(false);
const[snackbarMessage,setSnackbarMessage]=useState('');
const [inputInnerText,setInputInnerText]=useState('Drop your file here')

const writeFilename=(e)=>{
  setExcelFiles(e.target.files)
  setInputInnerText(e.target.files[0].name)
}

  const sendExcel=(e)=>{
    var fd=new FormData();
    console.log('excelFiles: ',excelFiles)
    console.log('first ',excelFiles[0])
    fd.append('excel',excelFiles[0]);
    axios.post(`${baseUrl}/products/uploadExcel`,fd,{headers:{Accept:'application/json'}})
    .then((res)=>{
      if(res.data.status==='success' || res.data.status==="Success"){
        setSnackbarMessage(res.data.message?res.data.message:'Task completed successfully');
        setSnackbarOpen(true);
      }
    })
    .catch(e=>{
      setSnackbarMessage(`Error: ${e.message}`);
      setSnackbarOpen(true);
    })
  }

  return (
    <div>
    <Snackbar open={snackbarOpen} setOpen={setSnackbarOpen} message={snackbarMessage}/>
      <Box style={{display:'flex',justifyContent:'right'}}><Button variant="contained"><Link style={{textDecoration:'none',color:'black'}} to="/manageProducts"><Typography variant="button">Manage Products</Typography></Link></Button></Box>
      <SingleProduct/>
      <hr style={{marginLeft:'20px'}}/>
      <Typography style={{marginLeft:'20px',fontWeight:'600',fontSize:'18px'}} variant="h6">Upload with excel</Typography>
      <div style={{marginLeft:'20px',marginTop:'20px'}}>
        <Button component='label' variant='outlined' style={{width:'50%',display:'block'}}>
          <Typography>{inputInnerText}</Typography>
          <input multiple="multiple" name="excel" onInput={e=>{writeFilename(e)}} type="file" hidden/>
        </Button> 
        <Button onClick={e=>{sendExcel(e)}} variant="contained" style={{marginTop:'5px'}}>Upload</Button>
      </div>
    </div>
  )
}
