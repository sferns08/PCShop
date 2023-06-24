import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route} from 'react-router-dom';
import SignIn from './pages/public/signIn';
import SignUp from './pages/public/signUp';
import Home from './pages/private/home';
import Colections from './pages/private/collections';
import Pago from './pages/private/pago';
import PagoRealizado from './pages/private/pagoRealizado';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/inicioSesion' />}></Route>
        <Route path='/inicioSesion' element={<SignIn />}></Route>
        <Route path='/registro' element={<SignUp />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/pago' element={<Pago />}></Route>
          <Route path='/productos' element={<Colections />}></Route>
          <Route path='/pagoRealizado' element={<PagoRealizado />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;