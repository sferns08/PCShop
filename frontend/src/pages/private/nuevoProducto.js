import React from "react";
import {Typography,Select, MenuItem, InputLabel  } from "@mui/material"; 
import Button from "@mui/material/Button"; 
import Box from "@mui/material/Box"; 
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid"; 
import AppBar from "@mui/material/AppBar"; 
import Container from "@mui/material/Container"; 
import Toolbar from "@mui/material/Toolbar";
import InputAdornment from "@mui/material/InputAdornment";
import MenuSuperior from "../../components/menuSuperior";
import { useProductos } from "../../hooks/useProductos";
import { CerrarSesion } from "../../hooks/useServidor";
import { useNavigate } from "react-router-dom";

export default function NuevoProducto() {

    const {addProducto} = useProductos();
    const navigate = useNavigate();

    const handleSubmit = (event) => { 
        event.preventDefault(); 
        const data = new FormData(event.currentTarget);
        addProducto(data);   
    };

    return ( 
        <Box> 
            <AppBar position="static" sx={{ width: "100%" }}> 
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h3" sx={{ flexGrow: 1, textAlign: "center" }}>Subir un Producto</Typography>
                    <Button onClick={()=>CerrarSesion(navigate)} type="submit" variant="contained">Salir</Button>
                </Toolbar> 
            </AppBar> 
            <MenuSuperior/> 
            <Container sx={{ marginTop: "5rem", maxWidth: "60%" }}> 
                <form onSubmit={handleSubmit}> 
                    <Grid container spacing={3}>
                        <Grid item xs={12}><TextField margin="normal" required fullWidth label="Nombre" name="nombre"/></Grid> 
                        <Grid item xs={6}>
                            <TextField margin="normal" required fullWidth label="Precio" name="precio"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">€</InputAdornment>,
                            }}/>
                            </Grid>
                        <Grid item xs={6}><TextField margin="normal" required fullWidth label="Stock" name="stock" type="number"/></Grid> 
                        <Grid item xs={12}><TextField margin="normal"fullWidth label="Inserta url de la imagen" name="imagen"/></Grid> 
                        <Grid item xs={12}>
                            <InputLabel id="categoria-label">Categoria</InputLabel>
                            <Select
                                labelId="categoria-label"
                                required
                                name="categoria"
                                fullWidth
                            >
                                <MenuItem value={1}>Smartphones</MenuItem>
                                <MenuItem value={2}>Perifericos</MenuItem>
                                <MenuItem value={3}>Ordenadores</MenuItem>
                                <MenuItem value={4}>TV</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}> 
                        <Button type="submit">Agregar producto</Button> 
                    </Box> 
                </form> 
            </Container> 
        </Box> 
    ); 
}
