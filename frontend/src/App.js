import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route} from 'react-router-dom';
//mport Login from './pages/login';
import Inicio from './pages/inicioSesion';
import Registro from './pages/registro';
import Home from './pages/home';
import Pago from './pages/pago';
import Prueba from './pages/prueba';
import Ordenadores from './pages/ordenadores';
import Perifericos from './pages/perifericos';
import Smartphones from './pages/smartphones';
import Televisores from './pages/televisores';
//import Nuevo from './pages/Nuevo';
import MenuLateral from "./components/MenuLateral";
import { ThemeProvider } from '@mui/material/styles';


function App() {
  return (
    <><Router>
      <Routes>
        <Route path='/' element={<Navigate to='/inicioSesion' />}></Route>
        <Route path='/inicioSesion' element={<Inicio />}></Route>
        <Route path='/registro' element={<Registro />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/pago' element={<Pago />}></Route>
        <Route path='/prueba' element={<Prueba />}></Route>
        <Route path='/ordenadores' element={<Ordenadores />}></Route>
        <Route path='/perifericos' element={<Perifericos />}></Route>
        <Route path='/televisores' element={<Televisores />}></Route>
        <Route path='/smartphones' element={<Smartphones />}></Route>
       

      </Routes>
    </Router></>
  );
}

export default App;