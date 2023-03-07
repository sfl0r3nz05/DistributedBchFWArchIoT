import {React, useState} from 'react';
import '../App.css'
import {AppBar,Box,Toolbar,IconButton,Typography,Button,Drawer,List, ListItem,ListItemText} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';


export default function Header(props){

    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar >
          <Typography variant="h6" component="div" justifyContent="left">
            Device App -  DistributedBchFWArchIoT
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    );
}