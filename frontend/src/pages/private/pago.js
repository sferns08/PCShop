import React from 'react';
import { styled } from '@mui/system';
import { Container, Typography, Button, TextField, MenuItem, InputLabel, Select, FormControl } from '@mui/material';

const ContainerWrapper = styled(Container)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ContentWrapper = styled('div')(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  textAlign: 'center',
}));

const Title = styled(Typography)(({ theme }) => ({
  color: '#000000',
  marginBottom: theme.spacing(4),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: '#707070',
  marginBottom: theme.spacing(2),
}));

const PaymentButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#E60000',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#B30000',
  },
}));

function Pago() {
  return (
    <ContainerWrapper maxWidth="sm">
      <ContentWrapper>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
      <Button
        href="/home"
        type="submit"
        variant="contained"
      >
        Volver
      </Button>
    </div>
        <Title variant="h4">Proceso de Pago</Title>
        <Subtitle variant="subtitle1">Total a pagar: $99.99</Subtitle>
        <Typography variant="body1">
          Ingresa los datos de tu tarjeta de crédito:
        </Typography>
        <div>
      <Typography variant="h6">Datos de la tarjeta de crédito</Typography>
      <TextField label="Número de tarjeta" fullWidth />
      <TextField label="Nombre del titular" fullWidth />
      <FormControl fullWidth>
        <InputLabel>Tipo de tarjeta</InputLabel>
        <Select>
          <MenuItem value="visa">Visa</MenuItem>
          <MenuItem value="mastercard">Mastercard</MenuItem>
          <MenuItem value="amex">American Express</MenuItem>
        </Select>
      </FormControl>
      <TextField label="Fecha de vencimiento" fullWidth />
      <TextField label="Código de seguridad" fullWidth />
    </div>
        {/* Aquí irían los campos de entrada para los datos de la tarjeta */}
        <PaymentButton variant="contained" href="/pagoRealizado">Pagar</PaymentButton>
      </ContentWrapper>
    </ContainerWrapper>
  );
}

export default Pago;


