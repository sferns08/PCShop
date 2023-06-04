import React from "react";
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

const products = [
  {
    id: 1,
    name: "Logitech MK470 Slim Combo Teclado + Ratón Inalámbricos Blanco",
    description: "Descripción del componente 1",
    image:
      "https://thumb.pccomponentes.com/w-300-300/articles/32/320884/1176-logitech-mk470-slim-combo-teclado-raton-inalambricos-blanco.jpg",
    price: 40.0,
  },
  {
    id: 2,
    name: "Logitech MX Anywhere 3 Ratón Compacto Inalámbrico 4000DPI Grafito",
    description: "",
    image:
      "https://thumb.pccomponentes.com/w-300-300/articles/1063/10636723/1998-logitech-mx-anywhere-3-for-business-raton-inalambrico-4000dpi-grafito.jpg",
    price: 23.45,
  },
  {
    id: 3,
    name: "Razer Kiyo X Webcam USB 1080P",
    description: "Descripción del componente 3",
    image:
      "https://thumb.pccomponentes.com/w-530-530/articles/69/690202/1206-razer-kiyo-x-webcam-usb-1080p.jpg",
    price: 26.75,
  },
];

function Perifericos() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h3" sx={{ flexGrow: 1, textAlign: "center" }}>
            Perifericos
          </Typography>
          <Button href="/inicioSesion" type="submit" variant="contained">
            Volver al Inicio
          </Button>
        </Toolbar>
      </AppBar>
      <MenuSuperior />

      <Container sx={{ marginTop: "2rem" }}>
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

export default Perifericos;
