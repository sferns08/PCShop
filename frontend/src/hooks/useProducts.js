import { useState } from "react";
import axios from "axios";

export const useProducts = () =>{
    const [products, setProducts] = useState([]);

    const addProduct = async (data) => {
        axios.post("http://127.0.0.1:8080/products/",{
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
    const getProducts = async (idCategoria) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8080/products/${idCategoria}`, {
                withCredentials: true,
            });

            // Si todo va bien
            console.log("Informacion de la respuesta: ", response.data);
            if (response.data != null) {
                setProducts(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
  
    const deleteProduct = async (indice) => {
        console.log(indice);
        try {
            const response = await axios.delete(`http://127.0.0.1:8080/products/${indice}`,{});
            console.log(response.data);
            const updatedProducts = products.filter(
                (product) => product.IdProducto !== indice
            );
            setProducts(updatedProducts);
        } catch (error) {
            console.error(error);
        }
    }
  
    return{
      products,
      addProduct,
      deleteProduct,
      getProducts
    }
  
}