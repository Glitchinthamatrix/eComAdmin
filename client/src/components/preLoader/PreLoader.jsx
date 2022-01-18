import CircularProgress from '@mui/material/CircularProgress';
import {Box} from "@material-ui/core";

export default function PreLoader(){
    return(
     <Box style={{flex:4}}><CircularProgress style={{color:'black', marginTop:'20%',marginLeft:'40%'}}/></Box>    )
}
