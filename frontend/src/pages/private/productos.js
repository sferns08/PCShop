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
import { useNavigate, useParams } from 'react-router-dom';
import { CerrarSesion } from "../../hooks/useServidor";

export default function Productos() {
  
  const {productos, getProductos, deleteProducto} = useProductos();
  const navigate = useNavigate();
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

  function handleDelete(id){
    deleteProducto(id);
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };
  const cookie = getCookie('jwt');

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h3" sx={{ flexGrow: 1, textAlign: "center" }}>{titulo}</Typography>
          <Button onClick={()=>CerrarSesion(navigate)} type="submit" variant="contained">Salir</Button>
        </Toolbar>
      </AppBar>
      <MenuSuperior />

      <Container sx={{ marginTop: "2rem" }}>
        <Grid container spacing={3}>
          {productos.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia component="img" height="300" image={product.Imagen} alt={product.Nombre}/>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">{product.Nombre}</Typography>
                  <Typography variant="h4" color="red">{product.Precio} €</Typography>
                </CardContent>
                <Button href="/pago" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Comprar</Button>
                {cookie === "1" && <Typography variant="h4">Stock:{product.Stock}</Typography>}
                {cookie === "1" && <Button type="submit" onClick={()=>handleDelete(product.IdProducto)} 
                  fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Eliminar</Button>}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}