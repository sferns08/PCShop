import axios from "axios";
import { useState } from "react";

export const usePedido= () =>{

  const [pedidos, setPedidos] = useState([]);

  const realizarPedido = async (data,navigate) => {
    const jwt = document.cookie.split('; ').find(row => row.startsWith('jwt')).split('=')[1];
    axios.post(`http://127.0.0.1:8080/pedido/${jwt}`,{
      IdProducto: parseInt(data.get("IdProducto")),
      Cantidad: parseInt(data.get("Cantidad")),
      Precio: parseFloat(data.get("Precio")),
      IdPago: parseInt(data.get("IdPago")),
      Direccion: data.get("Direccion"),
    },{
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then((response) => {
      const url = `/pagoRealizado/${response.data}`
      navigate(url);
    }).catch((error) => {
      alert("Error al realizar el pedido ",error)
    });
  }

  const getPedido = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8080/pedido/0`, {
            withCredentials: true,
        });
        // Si todo va bien
        if (response.data != null) {
            const respuesta = response.data;
            const pedidoEncontrado = respuesta.find(pedido => pedido.IdPedido === id);
            setPedidos(pedidoEncontrado);
        }
    } catch (error) {
        console.log(error);
    }
};


const getPedidos = async () => {
  try {
      const response = await axios.get(`http://127.0.0.1:8080/pedido/0`, {
          withCredentials: true,
      });
      // Si todo va bien
      if (response.data != null) { 
        setPedidos(response.data);
      }
  } catch (error) {
      console.log(error);
  }
};
      
  return{
    pedidos,
    realizarPedido,
    getPedido,
    getPedidos
  }
        
}