import * as React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { ListItemButton} from "@mui/material";
import List from '@mui/material/List';
import AddIcon from '@mui/icons-material/Add';


export default function MenuLateral() {
  const drawerWidth = 200;
  return (
    <div>
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
        <ListItem disablePadding>
              <ListItemButton href="/home">
                  <AddIcon sx={{mr:2}}/>Home
              </ListItemButton>
            </ListItem>
         <ListItem disablePadding>
            <ListItemButton href="/ordenadores">
                  <AddIcon sx={{mr:2}}/>Ordenadores
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
              <ListItemButton href="/smartphones">
                  <AddIcon sx={{mr:2}}/>Smartphones
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton href="/perifericos">
                  <AddIcon sx={{mr:2}}/>Perifericos
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href="/televisores">
                  <AddIcon sx={{mr:2}}/>Televisores
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
              <ListItemButton href="/inicioSesion">
                  <LogoutIcon sx={{mr:2}}/>Salir
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
    </div>
  );
}