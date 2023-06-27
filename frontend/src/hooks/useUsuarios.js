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
        Dni: data.get("Dni"),
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
      const jwt = document.cookie.split('; ').find(row => row.startsWith('jwt')).split('=')[1];
      const response = await axios.get(`http://127.0.0.1:8080/usuarios/0`, {
        withCredentials: true,
      });
      console.log("Los usuarios: ",response.data);
      if (response.data != null) {
        const respuesta = response.data;
        const encontrado = respuesta.find(usuario => usuario.IdUsuario === parseInt(jwt));
        setUsuarios(encontrado);
      }
      console.log("El usuario: ",jwt," es: ",usuarios);
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