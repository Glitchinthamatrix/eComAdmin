import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import {MoreVert} from '@material-ui/icons';
import MenuItem from '@mui/material/MenuItem';
import {Edit,Delete} from "@material-ui/icons";
import {Link} from "react-router-dom";

export default function MoreMenu({deleteRow,selectedRow}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVert style={{color:'black'}}/>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem><Link style={{color:'black',textDecoration:'none'}} to={`/editProduct/${selectedRow.id}`}><Edit/>Edit</Link></MenuItem>
        <MenuItem onClick={e=>{deleteRow(selectedRow.id)}}><Delete/>Delete</MenuItem>
      </Menu>
    </div>
  );
}
