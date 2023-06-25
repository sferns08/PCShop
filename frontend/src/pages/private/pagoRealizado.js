import React from 'react';
import { styled } from '@mui/system';
import { Container, Typography, Button} from '@mui/material';

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

function PagoRealizado() {
  return (
    <ContainerWrapper maxWidth="sm">
      <ContentWrapper>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
        <Typography>PAGO REALIZADO, MUCHAS GRACIAS POR SU COMPRA</Typography>
      <Button
        href="/inicio"
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