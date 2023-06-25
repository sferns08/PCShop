import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ComputerIcon from '@mui/icons-material/Computer';
import MouseIcon from '@mui/icons-material/Mouse';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LiveTvIcon from '@mui/icons-material/LiveTv';

export default function MenuSuperior() {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation showLabels value={value} onChange={(event, newValue) => { setValue(newValue);}}>
      <BottomNavigationAction href="/inicio" label="Inicio" value="Inicio" icon={<HomeIcon />} />
      <BottomNavigationAction href="/productos/1" label="Smartphones" icon={<SmartphoneIcon />} />
      <BottomNavigationAction href="/productos/2" label="Perifericos" icon={<MouseIcon />} />
      <BottomNavigationAction href="/productos/3" label="Ordenadores" icon={<ComputerIcon />} />
      <BottomNavigationAction href="/productos/4" label="TV" icon={<LiveTvIcon />} />
    </BottomNavigation>
  );
}