import * as React from 'react';
import {Delete} from '@material-ui/icons';
import { DataGrid } from '@mui/x-data-grid';
require('dotenv').config();
const environ = process.env.NODE_ENV;
const baseUrl = environ === 'production' ? '' : 'http://localhost:9000';

export default function BasicTable({delImage,perPage,setSnackbarMessage,setIsSnackbarOpen, filenames,setSelectedImage,handleModalOpen}) {
  const rows = [];
  const columns=[
  {
  field:'id',
  headerName:'index',
  width:100
  },
  {
    field: 'name',
    headerName: 'Filename',
    width: 300
  },
  {
    field:'URL',
    headerName:'URL',
    width:500
  },
  {
    field:'index',
    headerName:'Delete',
    renderCell:()=>{return(<Delete style={{cursor:'pointer'}}/>)}
  }
  ]

  function createData(name,index) {
    rows.push({id:index+1,index:index, name:name,URL:`/getProductImage/${name}`});
  }

  filenames.forEach((file,index)=>{
  createData(file,index);
  })
  
  function deleteImage(filename){
    var confirmation=prompt(`Type 'DELETE' If You Want To Delete ${filename}`);
    if(confirmation==='DELETE'){
      delImage(filename);
    }else{
      setSnackbarMessage('Deletion Aborted');
      setIsSnackbarOpen(true);
    }
  }
  const openModal=(image)=>{
    setSelectedImage(`${baseUrl}/images${image}`);
    handleModalOpen()
  }
  return (
      <DataGrid
      onCellClick={(event)=>{
        if(event.colDef.headerName==="URL"){
          openModal(event.row.URL);
        }else if(event.field==="index"){
          deleteImage(event.row.name);
        }
      }}
        style={{ height: 600, minWidth: '1100px' }}
        getRowId={(r)=>r.id}
        rows={rows}
        columns={columns}
        pageSize={perPage}
        rowsPerPageOptions={[perPage]}
        checkboxSelection
        disableSelectionOnClick
      />
  );
}
