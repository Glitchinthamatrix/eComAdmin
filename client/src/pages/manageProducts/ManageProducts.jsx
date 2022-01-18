import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useState,useEffect} from 'react';
import {Button} from "@material-ui/core";
import Snackbar from '../../components/snackbars/Snackbar.jsx';
import PreLoader from '../../components/preLoader/PreLoader.jsx';
import MoreMenu from "./MoreMenu.jsx";
import axios from 'axios';
import {baseUrl} from '../../utils.js';
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";

export default function ManageProducts() {
  const[selectedRow,setSelectedRow]=useState({});
  const [Error,setError]=useState("");
  const [rows,setRows]=useState([]); 
  const [snackbarMessage,setSnackbarMessage]=useState('');
  const [snackbarOpen,setSnackbarOpen]=useState(false);
 
  const deleteRow=async(id)=>{
    axios.delete(`${baseUrl}/products/delete/${id}`)
        .then((response) => {
            if(response.data.status==="success"){
              var neoRows=rows.filter((row)=>{
                return row._id!==id;
              });
              if(neoRows.length<1){
                setError("No products on database")
              }
              setRows(neoRows);
              setSnackbarMessage(`deleted product with id ${id}`);
              setSnackbarOpen(true);
            }else{
              setSnackbarMessage(`could not delete product`);
              setSnackbarOpen(true);
            }
        })
        .catch((e) => {
          setSnackbarMessage(`Error: ${e.message}`);
              setSnackbarOpen(true);
        })
  };
  const columns = [
    {field:'_id',headerName:'databaseId',width:200,sortable:true},
    {field:'SKU', headerName: 'SKU', width: 100,sortable:true},
    {field:'banned',headerName:'banned',width:100,sortable:true},
    {field:'categories',headerName:'categories',width:300,sortable:true},
    {field:'colors',headerName:'colors',width:100,sortable:true},
    {field:'name', headerName: 'Name', width: 150,sortable:true},
    {field:'title', headerName: 'Title', width: 150,sortable:true },
    {field:'description',headerName:'description',width:200,sortable:true},
    {field:'inStock',headerName:'inStock',width:100,sortable:true},
    {field:'length',headerName:'length',width:100,sortable:true},
    {field:'width',hedaerName:'width',width:100,sortable:true},
    {field:'weight',headerName:'weight',width:100,sortable:true},
    {field:'onSale',headerName:'onSale',width:100,sortable:true},
    {field:'postedAt',headerName:'posted',width:100,sortable:true},
    {field:'productImages',headerName:'images',width:150,sortable:true},
    {field:'regularPrice',headerName:'regularPrice',width:100,sortable:true},
    {field:'salePrice',headerName:'salePrice',width:100,sortable:true},
    {field:'sizes',headerName:'sizes',width:100,sortable:true},
    {field:'subCategories',haderName:'subCategories',width:100,sortable:true},
    {field:'tags',headerName:'tags',width:100,sortable:true},
    {field:'totalInStock',headerName:'totalInStock',width:100,sortable:true},
    {
      field: 'regularPrice',
      headerName: 'Regular Price',
      type: 'number',
      width: 200,sortable:true
    },
    {
      field: 'description',
      headerName: 'Description',
      sortable: true,
      width: 160
    },
    {
      headerName:"Options",
      field:'options',
      renderCell:()=>{return(<Button size="small"><MoreMenu setError={setError} deleteRow={deleteRow} seRows={setRows} rows={rows} selectedRow={selectedRow}/>
      </Button>)}
    }
  ];
  useEffect(()=>{
   const fetchProds=async()=>{
     axios.get(`${baseUrl}/products`)
     .then((res)=>{
       if(res.data.status==='success'){
         console.log('prods: ',res.data.products)
         if(res.data.products.length<=0){
           setError("No product in database");
           setRows([0])
         }
         setRows(res.data.products);
         setSnackbarMessage(`fetched ${res.data.total} products`);
         setSnackbarOpen(true);
       }else{
         setSnackbarMessage('Could not fetch products');
         setSnackbarOpen(true);
       }
     })
     .catch((e)=>{
       setSnackbarMessage(`Error: ${e.message}`);
       setSnackbarOpen(true);
    })
   }
   fetchProds();
  },[]);
  return (
    //if rows.length is more than 0 load table or load preloader
    
    Error? <ErrorMessage error={Error}/>:
    rows.length<1?
    <PreLoader/>:
    <div style={{ height: 600, width: '100%',marginLeft:'20px' }}>

    <Snackbar open={snackbarOpen} message={snackbarMessage} setOpen={setSnackbarOpen}/>
      <DataGrid
      onCellClick={e=>{setSelectedRow(e)}}
      style={{fontSize:'14px'}}
      getRowId={(r) => r._id}
      isCellEditable={() => {return true}}
        rows={rows}
        density="standard"
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
