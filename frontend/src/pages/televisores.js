import React from 'react';
import MenuLateral from "../components/MenuLateral";
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
  Link,
  Box,
} from '@mui/material';

const products = [
  {
    id: 1,
    name: 'LG 32LQ631C 32" LED FullHD HDR',
    description: 'Descripción del componente 1',
    image: 'https://thumb.pccomponentes.com/w-300-300/articles/1065/10658868/1568-lg-32lq631c-32-led-fullhd-hdr.jpg',
    price:470,
    
  },
  {
    id: 2,
    name: 'LG 43NANO766QA 43" LED NanoCell UltraHD 4K HDR10 Pro',
    description: 'Descripción del componente 2',
    image: 'https://thumb.pccomponentes.com/w-300-300/articles/1024/10241255/1424-lg-43nano766qa-43-led-nanocell-ultrahd-4k-hdr10-pro.jpg',
    price:670.75,
  },
  {
    id: 3,
    name: 'LG 50UQ81003LB 50" LED UltraHD 4K HDR10 Pro',
    description: 'Descripción del componente 3',
    image: 'https://thumb.pccomponentes.com/w-530-530/articles/1062/10622660/1762-lg-50uq81003lb-50-led-ultrahd-4k-hdr10-pro.jpg',
    price:980.70,
  },
];

function Televisores() {
  return (
    <Box sx={{display:"flex"}}>
      <MenuLateral />
      <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h3" sx={{ flexGrow: 1, textAlign: 'center' }}>Televisores</Typography>
        <Button
            href="/inicioSesion"
            type="submit"
            variant="contained"
          >
            Volver al Inicio
        </Button>
        </Toolbar>
      </AppBar>

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
    </Box>
  );
}

export default Televisores;