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

const products = [
  {
    id: 1,
    name: 'Tempest PC Lite Intel Core i5-10400F/16GB/500GB SSD/GTX1660S - Negro',
    description: 'Descripción del componente 1',
    image: 'https://thumb.pccomponentes.com/w-300-300/articles/1073/10732433/1124-tempest-pc-lite-intel-core-i5-10400f-16gb-500gb-ssd-gtx1660s-negro.jpg',
    price:750,
  },
  {
    id: 2,
    name: 'Apple iPhone 14 128GB (PRODUCT)RED Libre',
    description: 'Descripción del componente 2',
    image: 'https://thumb.pccomponentes.com/w-300-300/articles/1058/10581405/1111-apple-iphone-14-128gb-productred-libre.jpg',
    price:825,
  },
  {
    id: 3,
    name: 'ASUS Dual GeForce RTX 3060 Ti OC Edition 8GB GDDR6X',
    description: 'Descripción del componente 3',
    image: 'https://img.pccomponentes.com/articles/1065/10651302/1996-asus-dual-geforce-rtx-3060-ti-oc-edition-8gb-gddr6x-7d1c208f-17e6-4b17-9bca-a1ff637a9797.jpg',
    price:390.90,
  },
];

function Home() {
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
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="400"
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

export default Home;
