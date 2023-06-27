import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ComputerIcon from '@mui/icons-material/Computer';
import MouseIcon from '@mui/icons-material/Mouse';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';

export default function MenuSuperior() {
  const [value, setValue] = React.useState(0);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  const cookie = getCookie('jwt');
  
  return (
    <BottomNavigation showLabels value={value} onChange={(event, newValue) => { setValue(newValue);}}>
      <BottomNavigationAction href="/productos/0" label="Inicio" icon={<HomeIcon />} />
      <BottomNavigationAction href="/productos/1" label="Smartphones" icon={<SmartphoneIcon />} />
      <BottomNavigationAction href="/productos/2" label="Perifericos" icon={<MouseIcon />} />
      <BottomNavigationAction href="/productos/3" label="Ordenadores" icon={<ComputerIcon />} />
      <BottomNavigationAction href="/productos/4" label="TV" icon={<LiveTvIcon />} />
      <BottomNavigationAction href="/historial" label="Mis Pedidos" icon={<LocalShippingIcon />} />
      {cookie === "1" && <BottomNavigationAction href="/nuevoProducto" label="Subir producto" icon={<AddIcon />} />}
    </BottomNavigation>
  );
}