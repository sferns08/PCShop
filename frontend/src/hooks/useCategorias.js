import { useState } from "react";
import axios from "axios";

export const useProductos = () =>{
    const [productos, setProductos] = useState([]);

    const addProducto = async (data) => {
        axios.post("http://127.0.0.1:8080/productos/",{
            IdCategoria: data.get('categoria'),
            Nombre: data.get('nombre'),
            Precio: data.get('precio'),
            Stock: data.get('stock'),
            Imagen: data.get('imagen')
        },{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }).then((response) => {
            alert(response.data);
        }).catch((error) => {
            console.log("Respuesta fallida: ",error)
        });
    }

    // Obtiene los productos de la categoria indicada 
    const getProductos = async (idCategoria) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8080/productos/${idCategoria}`, {
                withCredentials: true,
            });

            // Si todo va bien
            console.log("Informacion de la respuesta: ", response.data);
            if (response.data != null) {
                setProductos(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
  
    const deleteProducto = async (indice) => {
        console.log(indice);
        try {
            const response = await axios.delete(`http://127.0.0.1:8080/productos/${indice}`,{});
            console.log(response.data);
            const updatedProductos = productos.filter(
                (product) => product.IdProducto !== indice
            );
            setProductos(updatedProductos);
        } catch (error) {
            console.error(error);
        }
    }
  
    return{
      productos,
      addProducto,
      deleteProducto,
      getProductos
    }
  
}