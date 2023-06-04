import React from 'react';
import { styled } from '@mui/system';
import { Container, Typography, Button, TextField, MenuItem, InputLabel, Select, FormControl, Grid } from '@mui/material';

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

function PagoRealizado() {
  return (
    <ContainerWrapper maxWidth="sm">
      <ContentWrapper>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
        <Typography>PAGO REALIZADO, MUCHAS GRACIAS POR SU COMPRA</Typography>
      <Button
        href="/home"
        type="submit"
        variant="contained"
      >
        Volver
      </Button>
    </div>
      </ContentWrapper>
    </ContainerWrapper>
  );
}

export default PagoRealizado;