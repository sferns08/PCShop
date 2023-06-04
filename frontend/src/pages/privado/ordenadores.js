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
    name: 'MSI Crosshair 17 C12VF-264XES Intel Core i7-12650H/32GB/1TB SSD/RTX 4060/17.3"',
    description: 'Descripción del componente 1',
    image: 'https://thumb.pccomponentes.com/w-300-300/articles/1067/10672822/1150-msi-crosshair-17-c12vf-264xes-intel-core-i7-12650h-32gb-1tb-ssd-rtx-4060-173-3f9f42ce-2559-4d05-af10-f8d0a23c57de.jpg',
    price:1399
  },
  {
    id: 2,
    name: 'MSI Katana GF66 12UC-082XES Intel Core i7-12700H/16GB/1TB SSD/RTX3050/15.6"',
    description: 'Descripción del componente 2',
    image: 'https://thumb.pccomponentes.com/w-300-300/articles/1001/10011004/1466-msi-katana-gf66-12ud-082xes-intel-core-i7-12700h-16gb-1tb-ssd-rtx3050-156-3b7c3f62-ac49-4155-bcd2-35f217618c49.jpg',
    price:900
  },
  {
    id: 3,
    name: 'MSI GF63 Thin 11UC-446XES Intel Core i7-11800H/16GB/512GB SSD/RTX 3050/15.6"',
    description: 'Descripción del componente 3',
    image: 'https://thumb.pccomponentes.com/w-300-300/articles/83/837985/1667-msi-gf63-thin-11uc-446xes-intel-core-i7-11800h-16gb-512gb-ssd-rtx-3050-156.jpg',
    price:679
  },
];

function Ordenadores() {
  return (
    <Box sx={{display:"flex"}}>
      <MenuLateral />
      <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h3" sx={{ flexGrow: 1, textAlign: 'center' }}>Ordenadores</Typography>
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

export default Ordenadores;
