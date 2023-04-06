import {React, useState} from 'react';
import '../App.css'
import {AppBar,Box,Toolbar,IconButton,Typography,Button,Drawer,List, ListItem,ListItemText} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';


export default function Header(props){
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const selectComponent = (num) =>{
    props.setSelectedComponent(num);
    handleDrawerToggle();
  }
    
    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" justifyContent="left">
            Author App -  DistributedBchFWArchIoT
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button onClick={() => selectComponent(0)}>
            <ListItemText primary="RegisterAuthor" />
          </ListItem>
          <ListItem button  onClick={() => selectComponent(1)}>
            <ListItemText primary="Register Update" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
    );
}