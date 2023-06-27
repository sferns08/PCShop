import React, { useEffect } from 'react';
import {Button, Grid, Typography} from '@mui/material';
import { usePedido } from '../../hooks/usePedido';
import { useUsuarios } from '../../hooks/useUsuarios';
import { useProductos } from '../../hooks/useProductos';
import { useParams } from 'react-router-dom';
import { useFactura } from '../../hooks/useFactura';

function PagoRealizado() {

  const {pedidos,getPedido} = usePedido();
  const {facturas, getFactura} = useFactura();
  const {productos, getProducto} = useProductos();
  const {usuarios,getUsuario} = useUsuarios();
  const { idPedido } = useParams();

  useEffect(() => {
    getPedido(parseInt(idPedido));
    getUsuario();
  }, []);

  useEffect(() => {
    if (pedidos.IdFactura) {
      getFactura(pedidos.IdFactura);
      getProducto(pedidos.IdProducto);
    }
  }, [pedidos]);

  return (
    <div>
      <Typography sx={{fontSize: 32, fontWeight: 'bold', textAlign: 'center', margin: 1}}>Factura</Typography>
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <Grid container sx={{maxWidth: 800, padding: 1, border: '1px solid #ccc'}}>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', color: '#999'}}>Producto:</Grid>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', textAlign: 'right'}}>{productos.Nombre}</Grid>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', color: '#999'}}>Cantidad:</Grid>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', textAlign: 'right'}}>{pedidos.Cantidad}</Grid>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', color: '#999'}}>Precio sin IVA:</Grid>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', textAlign: 'right'}}>{(pedidos.Precio / 1.21).toFixed(2)}</Grid>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', color: '#999'}}>Precio con IVA:</Grid>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', textAlign: 'right'}}>{pedidos.Precio}</Grid>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', color: '#999'}}>Fecha:</Grid>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', textAlign: 'right'}}>
          {new Date(facturas.Fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })}</Grid>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', color: '#999'}}>Dirección de envio:</Grid>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', textAlign: 'right'}}>{pedidos.Direccion}</Grid>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', color: '#999'}}>Nombre del cliente:</Grid>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', textAlign: 'right'}}>{usuarios.Nombre} {usuarios.Apellido}</Grid>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', color: '#999'}}>DNI del cliente:</Grid>
        <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', textAlign: 'right'}}>{usuarios.Dni}</Grid>
        <Grid item xs={12}>
          <Button href="/productos/0" type="submit" variant="contained" 
            sx={{
              textAlign: 'center',
              display:'block',
              margin:'20px auto', 
              padding:'10px 20px', 
              backgroundColor:'#0099ff', 
              color:'white', 
              textDecoration:'none', 
              boxShadow:'2px 2px 4px rgba(0,0,0,0.2)'
            }}>Volver
          </Button>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}

export default PagoRealizado;


