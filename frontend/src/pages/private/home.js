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
import MenuSuperior from "../../components/menuSuperior";
import { useProducts } from "../../hooks/useProducts";
import { useEffect} from "react";


function Home() {

  const {products, getProducts, deleteProduct, addProduct} = useProducts();

  useEffect(() => {getProducts(1)}, []);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h3" sx={{ flexGrow: 1, textAlign: 'center' }}>PCShop</Typography>
          <Button href="/inicioSesion" type="submit" variant="contained">Volver al Inicio</Button>
        </Toolbar>
      </AppBar>
      <MenuSuperior />
      <Container sx={{ marginTop: '2rem' }}>
        <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
          Productos Destacados
        </Typography>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.IdProducto} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="400"
                    image={product.Imagen}
                    alt={product.Nombre}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.Nombre}
                    </Typography>
                    <Typography variant="h4" color="red">
                      {product.Precio} €
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

export default Home;
