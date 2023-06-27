import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route} from 'react-router-dom';
import InicioSesion from './pages/public/inicioSesion';
import Registro from './pages/public/registro';
import Productos from './pages/private/productos';
import Pago from './pages/private/pedido';
import PagoRealizado from './pages/private/pagoRealizado';
import NuevoProducto from './pages/private/nuevoProducto';
import RutaProtegida from './RutaProtegida';
import Historial from './pages/private/historial';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/inicioSesion' />}></Route>
        <Route path='/inicioSesion' element={<InicioSesion />}></Route>
        <Route path='/registro' element={<Registro />}></Route>
        <Route element={<RutaProtegida />}>
          <Route path='/productos/:id' element={<Productos />}></Route>
          <Route path='/nuevoProducto' element={<NuevoProducto />}></Route>
          <Route path='/pedido/:idProducto' element={<Pago />}></Route>
          <Route path='/pagoRealizado/:idPedido' element={<PagoRealizado />}></Route>
          <Route path='/historial' element={<Historial />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;