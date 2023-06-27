import { useState } from "react";
import axios from "axios";

export const useProductos = () =>{
    const [productos, setProductos] = useState([]);

    const addProducto = async (data) => {

        axios.post("http://127.0.0.1:8080/productos/",{
            IdCategoria: parseInt(data.get('categoria')),
            Nombre: data.get('nombre'),
            Precio: parseFloat(data.get('precio')),
            Stock: parseInt(data.get('stock')),
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
            if (response.data != null) {
                setProductos(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Obtiene el producto con el id indicado
    const getProducto = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8080/productos/0`, {
                withCredentials: true,
            });
            // Si todo va bien
            if (response.data != null) {
                const respuesta = response.data;
                const productoEncontrado = respuesta.find(producto => producto.IdProducto === id);
                setProductos(productoEncontrado);
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
      getProductos,
      getProducto
    }
  
}