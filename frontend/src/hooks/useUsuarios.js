import { useState } from "react";
import axios from "axios";

export const useUsuarios = () =>{
    const [usuarios, setUsuarios] = useState([]);
    
    const addUsuario = async (data,fecha) => {
      axios.post("http://127.0.0.1:8080/usuarios/", 
      {
        Nombre: data.get("Nombre"),
        Apellido: data.get("Apellidos"),
        Direccion: data.get("Direccion"),
        Fecha_nac: fecha,
        Telefono: data.get("Telefono"),
        Email: data.get("Email"),
        Password: data.get("Password")
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        alert(response.data);
      }).catch(error => {
        alert("Error en la solicitud:", error);
      });
    }

    const getUsuario = async () => {
        try {
        const response = await axios.get("http://127.0.0.1:8080/users/", {
            withCredentials: true,
        });
        console.log("Informacion de la respuesta", response.data);
        if (response.data != null) {
            setUsuarios(response.data);
        }
        console.log(usuarios);
        } catch (error) {
        console.log(error);
        }
    };

    return {
      usuarios,
      addUsuario,
      getUsuario
    };

}  