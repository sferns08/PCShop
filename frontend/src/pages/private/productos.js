import React ,{useState} from "react";
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
import { useEffect} from "react";
import MenuSuperior from "../../components/menuSuperior";
import { useProductos } from "../../hooks/useProductos";
import { useParams } from 'react-router-dom';

export default function Productos() {
  
  const {productos, getProductos} = useProductos();
  const { id } = useParams();
  const [titulo, setTitulo] = useState([]);
  
  useEffect(() => {
    if (id === "0") {
      setTitulo("PC-Shop");
    } else if (id === "1") {
      setTitulo("Smartphones");
    } else if (id === "2") {
      setTitulo("Perifericos");
    } else if (id === "3") {
      setTitulo("Ordenadores");
    } else if (id === "4") {
      setTitulo("TV");
    }
    getProductos(id);
  }, []);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h3" sx={{ flexGrow: 1, textAlign: "center" }}>
          {titulo}
          </Typography>
          <Button href="/inicioSesion" type="submit" variant="contained">
            Volver al Inicio
          </Button>
        </Toolbar>
      </AppBar>
      <MenuSuperior />

      <Container sx={{ marginTop: "2rem" }}>
        <Grid container spacing={3}>
          {productos.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
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