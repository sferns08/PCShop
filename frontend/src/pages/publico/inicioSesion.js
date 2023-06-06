import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import ordenadorInicio from "../../img/ordenadorInicio.webp";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function InicioSesion() {
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formData = {
      Email: data.get("Email"),
      Password: data.get("Password"),
    };

    try {
      const response = await axios.post("http://127.0.0.1:8080/signIn", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if(response.data === 0){
        alert("Datos de inicio de sesión incorrectos");
      }else{
        document.cookie = response.data;
        navigate("/home")
      }
    } catch (error) {
      alert("Hubo un error al iniciar sesión. Por favor, intenta nuevamente.");
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}
          sx={{
            backgroundImage: `url(${ordenadorInicio})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Inicia Sesión</Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth label="Email" name="Email" autoComplete="email" autoFocus />
              <TextField margin="normal" required fullWidth name="Password" label="Password" type="password" autoComplete="current-password" />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Inicia Sesion</Button>
              <Grid container>
                <Grid item>
                  <Link variant="body2" href="/registro">
                    {"¿No tienes cuenta? Regístrate"}
                  </Link>
                </Grid>
              </Grid>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
                {'Copyright © PCShop '}{new Date().getFullYear()}{'.'}
              </Typography>
            </Box>
          </Box>
        </Grid>
    </Grid>
  );
}