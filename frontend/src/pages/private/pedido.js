import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, TextField, MenuItem, InputLabel, Select, FormControl, Box } from '@mui/material';
import { useProductos } from '../../hooks/useProductos';
import { useNavigate, useParams } from 'react-router-dom';
import { usePedido } from '../../hooks/usePedido';

function Pedido() {
  const {productos, getProducto} = useProductos();
  const {realizarPedido} = usePedido();
  const [cantidad, setCantidad] = useState(1);
  const { idProducto } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProducto(parseInt(idProducto));
  }, []);

  const handleCantidadChange = (event) => {
    const valor = event.target.value;
    if (valor < 1) {
      setCantidad(1);
    } else if (valor > productos.Stock) {
      setCantidad(productos.Stock);
    } else {
      setCantidad(valor);
    }
  };

  function handleSubmit(event){
    event.preventDefault(); 
    const data = new FormData(event.currentTarget);
    data.append("IdProducto",idProducto);
    data.append("Cantidad",cantidad);
    data.append("Precio",totalAPagar);
    realizarPedido(data,navigate);
  };

  const totalAPagar = productos ? productos.Precio * cantidad : 0;

  return (
    <Container sx={{ backgroundColor: '#f5f5f5',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}} maxWidth="sm">
      <Box sx={{backgroundColor: '#ffffff', padding: 4, borderRadius: 2,  textAlign: 'center'}}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
          <Button href="/productos/0" variant="contained">Inicio</Button>
        </div>
        <form onSubmit={handleSubmit}>
          <Typography sx={{color: '#000000', marginBottom: 4}} variant="h4">Pasarela de Pago</Typography>
          {productos && (
            <>
              <Typography sx={{color: '#707070',marginBottom:2}} variant="subtitle1">Producto: {productos.Nombre}</Typography>
              <TextField sx={{mb:"2%"}} label="Cantidad" fullWidth type='number' value={cantidad} onChange={handleCantidadChange} />
              <Typography sx={{color: '#707070'}} variant="subtitle1">Precio sin IVA: {(totalAPagar / 1.21).toFixed(2)} €</Typography>
              <Typography sx={{color: '#707070'}} variant="subtitle1">IVA 21%: {(totalAPagar * 0.21).toFixed(2)} €</Typography>
              <Typography sx={{color: '#707070'}} variant="subtitle1">Total a pagar: {totalAPagar} €</Typography>
              <TextField sx={{mb:"2%"}} required name="Direccion" label="Dirección de destino" fullWidth />
            </>
          )}
          <div>
            <Typography variant="h6">Datos de la tarjeta de crédito</Typography>
            <TextField sx={{mb:"2%"}} required name="NumTarjeta" label="Número de tarjeta" fullWidth />
            <TextField sx={{mb:"2%"}} required num="Titular" label="Nombre del titular" fullWidth/>
            <FormControl sx={{mb:"2%"}} fullWidth>
              <InputLabel>Tipo de tarjeta</InputLabel>
              <Select name="IdPago">
                <MenuItem value={1}>Visa</MenuItem>
                <MenuItem value={2}>Mastercard</MenuItem>
                <MenuItem value={3}>American Express</MenuItem>
              </Select>
            </FormControl>
            <TextField sx={{mb:"2%"}} required num="FechaVencimiento" label="Fecha de vencimiento" fullWidth />
            <TextField sx={{mb:"2%"}} required num="cvc" label="Código de seguridad" fullWidth />
          </div>
          <Button type="submit" variant="contained" sx={{bgcolor:'#E60000', color: '#ffffff'}}>Pagar</Button>
        </form>
      </Box>
    </Container>
  );
}

export default Pedido;
