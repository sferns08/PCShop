import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ComputerIcon from '@mui/icons-material/Computer';
import MouseIcon from '@mui/icons-material/Mouse';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ClearIcon from '@mui/icons-material/Clear';
import LiveTvIcon from '@mui/icons-material/LiveTv';

export default function MenuSuperior() {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation showLabels value={value} onChange={(event, newValue) => { setValue(newValue);}}>
      <BottomNavigationAction href="/home" label="Inicio" value="Inicio" icon={<HomeIcon />} />
      <BottomNavigationAction href="/ordenadores" label="Ordenadores" icon={<ComputerIcon />} />
      <BottomNavigationAction href="/smartphones" label="Smartphones" icon={<SmartphoneIcon />} />
      <BottomNavigationAction href="/perifericos" label="perifericos" icon={<MouseIcon />} />
      <BottomNavigationAction href="/televisores" label="TV" icon={<LiveTvIcon />} />
      <BottomNavigationAction href="/inicioSesion" label="Salir" icon={<ClearIcon />} />
    </BottomNavigation>
  );
}