import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route} from 'react-router-dom';

import Inicio from './pages/publico/inicioSesion';
import Registro from './pages/publico/registro';
import Home from './pages/privado/home';
import Pago from './pages/privado/pago';
import Productos from './pages/privado/productos';
import PagoRealizado from './pages/privado/pagoRealizado';
import LoginChecker from './servidor/loginChecker';


function App() {
  return (
    <Router>
      <LoginChecker />
      <Routes>
        <Route path='/' element={<Navigate to='/inicioSesion' />}></Route>
        <Route path='/inicioSesion' element={<Inicio />}></Route>
        <Route path='/registro' element={<Registro />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/pago' element={<Pago />}></Route>
        <Route path='/productos' element={<Productos />}></Route>
        <Route path='/pagoRealizado' element={<PagoRealizado />}></Route>
      </Routes>
    </Router>
  );
}

export default App;