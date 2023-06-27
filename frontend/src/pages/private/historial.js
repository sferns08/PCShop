import React, { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import MenuSuperior from "../../components/menuSuperior";
import { useProductos } from "../../hooks/useProductos";
import { CerrarSesion } from "../../hooks/useServidor";
import { usePedido } from "../../hooks/usePedido";
import { useUsuarios } from '../../hooks/useUsuarios';
import { useNavigate, useParams } from 'react-router-dom';
import { useFactura } from '../../hooks/useFactura';

export default function Historial() {
    const {pedidos,getPedidos} = usePedido();
    const navigate = useNavigate();
  
    useEffect(() => {
      getPedidos();
    }, []);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h3" sx={{ flexGrow: 1, textAlign: "center" }}>Historial de Pedidos</Typography>
          <Button onClick={()=>CerrarSesion(navigate)} type="submit" variant="contained">Salir</Button>
        </Toolbar>
      </AppBar>
      <MenuSuperior />

      <Container sx={{ marginTop: "2rem" }}>
        <Grid container spacing={1}>
          {pedidos.map((pedido, index) => (
            <Grid item key={index} xs={12}>
              <Card><CardActionArea href={"/pagoRealizado/"+pedido.IdPedido}>
                <CardContent>
                <Grid container>
                <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', color: '#999'}}>Numero de pedido:</Grid>
                <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc'}}>{pedido.IdPedido}</Grid>
                <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', color: '#999'}}>Precio:</Grid>
                <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc'}}>{pedido.Precio} €</Grid>
                <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc', color: '#999'}}>Direccion:</Grid>
                <Grid item xs={6} sx={{padding: 1, borderBottom: '1px solid #ccc'}}>{pedido.Direccion}</Grid>
                </Grid>
                </CardContent>
                </CardActionArea></Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}