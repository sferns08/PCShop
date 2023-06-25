import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route} from 'react-router-dom';
import InicioSesion from './pages/public/inicioSesion';
import Registro from './pages/public/registro';
import Productos from './pages/private/productos';
import Pago from './pages/private/pago';
import PagoRealizado from './pages/private/pagoRealizado';
import RutaProtegida from './RutaProtegida';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/inicioSesion' />}></Route>
        <Route path='/inicioSesion' element={<InicioSesion />}></Route>
        <Route path='/registro' element={<Registro />}></Route>
        <Route element={<RutaProtegida />}>
          <Route path='/productos/:id' element={<Productos />}></Route>
          <Route path='/pago' element={<Pago />}></Route>
          <Route path='/pagoRealizado' element={<PagoRealizado />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;