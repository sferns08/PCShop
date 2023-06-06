import React from 'react';
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
} from '@mui/material';
import MenuSuperior from '../../components/menuSuperior';
import axios from "axios";
import { useEffect, useState } from "react";

function Ordenadores() {
  const [dispositivos, setDispositivos] = useState([]);

  useEffect(() => {
    getDispositivos();
  }, []);

  const getDispositivos = async () => {
    try {
      const now = new Date();
      const expires = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
      document.cookie = `categoria=2; expires=${expires.toUTCString()}; path=/`;

      const response = await axios.get(`http://127.0.0.1:8080/home/3`, {
        withCredentials: true,
      });
      console.log("Informacion de la respuesta: ", response.data);
      if (response.data != null) {
        setDispositivos(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Reemplazar products con dispositivos
  const products = dispositivos.map((dispositivo) => ({
    id: dispositivo.IdProducto,
    categoria: dispositivo.IdCategoria,
    name: dispositivo.Nombre,
    image: dispositivo.Imagen,
    price: dispositivo.Precio,
  }));
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h3" sx={{ flexGrow: 1, textAlign: 'center' }}>Ordenadores</Typography>
          <Button href="/inicioSesion" type="submit" variant="contained">Volver al Inicio</Button>
        </Toolbar>
      </AppBar>
      <MenuSuperior />

      <Container sx={{ marginTop: '2rem' }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="h4" color="red">
                      {product.price} €
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button
                  href="/pago"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Comprar
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Ordenadores;
