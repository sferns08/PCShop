import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useUsuarios } from "../../hooks/useUsuarios";

function Registro() {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [aviso, setAviso] = React.useState(false);
  const {addUsuario} = useUsuarios();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fecha = new Date(selectedDate);
    // Verificar si hay campos requeridos sin completar
    const values = Array.from(data.values());
    if (values.some((value) => value === "" || value === null)) {
      setAviso(true);
      setTimeout(() => {
        setAviso(false);
      }, 2000);
      return;
    }else{
      addUsuario(data,fecha);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Regístrate
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="given-name" name="Nombre" required fullWidth label="Nombre" autoFocus/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth label="Apellidos" name="Apellidos" autoComplete="family-name"/>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label="Dni" name="Dni"/>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label="Email" name="Email" autoComplete="email"/>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="Password" label="Password" type="password" autoComplete="new-password"/>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="Direccion" label="Dirección"/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="Telefono" required fullWidth label="Número teléfono" autoFocus/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker value={selectedDate} onChange={handleDateChange} />
                </LocalizationProvider>
              </Grid>
            </Grid>
            {aviso && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                Por favor, completa todos los campos requeridos.
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Regístrate
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/inicioSesion" variant="body2">
                  ¿Ya tienes cuenta? Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Registro;
