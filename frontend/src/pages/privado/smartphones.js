import React from 'react';
import MenuLateral from "../../components/MenuLateral";
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

const products = [
  {
    id: 1,
    name: 'Xiaomi Redmi Note 11S 6/128GB Gris Libre',
    description: 'Descripción del componente 1',
    image: 'https://thumb.pccomponentes.com/w-300-300/articles/1019/10190752/159-xiaomi-redmi-note-11s-6-128gb-gris-libre.jpg',
    price:890,
  },
  {
    id: 2,
    name: 'Samsung Galaxy M23 5G 4/128GB Azul Libre',
    description: 'Descripción del componente 2',
    image: 'https://thumb.pccomponentes.com/w-300-300/articles/1018/10186126/1485-samsung-galaxy-m23-5g-4-128gb-azul-libre.jpg',
    price:970,
  },
  {
    id: 3,
    name: 'POCO M4 5G 6/128GB Negro Libre',
    description: 'Descripción del componente 3',
    image: 'https://thumb.pccomponentes.com/w-300-300/articles/1058/10585049/1970-poco-m4-5g-6-128gb-negro-libre.jpg',
    price:785,
  },
];

function Smartphones() {
  return (
    <Box sx={{display:"flex"}}>
      <MenuLateral />
      <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h3" sx={{ flexGrow: 1, textAlign: 'center' }}>Smartphones</Typography>
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
    </Box>
  );
}

export default Smartphones;