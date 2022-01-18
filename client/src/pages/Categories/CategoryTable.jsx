import * as React from 'react';
import { Delete } from '@material-ui/icons';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
require('dotenv').config();
const environ = process.env.NODE_ENV;
const baseUrl = environ === 'production' ? '' : 'http://localhost:9000';

export default function BasicTable({ rows,perPage, setSnackbarMessage, setIsSnackbarOpen }) {

    const columns = [
        { headerName: 'Index', field: '_id',width:200 },
        { headerName: 'Category', field: 'category' },
        { headerName: 'Sub-Categories', field: 'subCategories',width:200 },
        { headerName: 'tags', field: 'tags' },
        {headerName:'Delete',field:'_v',renderCell:()=>{return(<Delete style={{cursor:'pointer'}}/>)}}
    ]

    const deleteCategory = (id, category) => {
        var confirm = prompt(`type "${category}" if you want to delete it`);
        if (confirm === category) {
            axios.delete(`${baseUrl}/categories/deleteOne/${id}`)
                .then((res) => {
                    console.log('response: ', res.data)
                    if (res.data.error) {
                        setSnackbarMessage(`Error: ${res.data.error}`)
                        setIsSnackbarOpen(true);
                    } else if (typeof res.data.status == 'undefined' || !res.data.status || res.data.status !== "success") {
                        setSnackbarMessage("Unexpected error, didn't recieve response status")
                        setIsSnackbarOpen(true);
                    } else if (typeof res.data.status != 'undefined' && res.data.status && res.data.status === "success") {
                        setSnackbarMessage("Deleted Category")
                        setIsSnackbarOpen(true);
                    }
                })
        } else {
            alert('Deletion aborted')
        }
    }
    return ( 
        
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        onCellClick={(event)=>event.field==="_v"?deleteCategory(event.row._id,event.row.category):''}
        rows={rows}
        getRowId={r=>r._id}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
    );
}