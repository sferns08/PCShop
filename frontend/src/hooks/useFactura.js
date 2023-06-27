import axios from "axios";
import { useState } from "react";

export const useFactura = () =>{

  const [facturas, setFacturas] = useState([]);

  const getFactura = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8080/factura/0`, {
            withCredentials: true,
        });
        // Si todo va bien
        if (response.data != null) {
            const respuesta = response.data;
            const facturaEncontrada = respuesta.find(factura => factura.IdFactura === id);
            setFacturas(facturaEncontrada);
        }
    } catch (error) {
        console.log(error);
    }
};
const getFacturas = async () => {
  try {
      const response = await axios.get(`http://127.0.0.1:8080/factura/0`, {
          withCredentials: true,
      });
      // Si todo va bien
      if (response.data != null) {
          setFacturas(response.data);
      }
  } catch (error) {
      console.log(error);
  }
};
      
  return{
    facturas,
    getFactura,
    getFacturas
  }
        
}