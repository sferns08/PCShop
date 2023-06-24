import axios from "axios";

// Iniciar sesión
export const IniciarSesion = (data, navigate) => {
  axios
    .post("http://127.0.0.1:8080/signIn",
      {
        UserName: data.get("Email"),
        Password: data.get("Password"),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    ).then((response) => {
      console.log(response.data);
      document.cookie = response.data;
      navigate("/Inicio");
    }).catch((error) => {
      alert(
        `Datos de inicio de sesión incorrectos\nUsuario: ${data.get(
        "username")}\nContraseña: ${data.get("password")}`
      );
      console.log(error);
    });
};

// Cerrar sesión
export const CerrarSesion = async (navigate) => {
  
  // Obtén todas las cookies del navegador
  const cookies = document.cookie.split(";");

  // Recorre todas las cookies y las elimina una por una
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    console.log(cookie);
  }

  // Vuelve al login
  navigate("/inicioSesion");
};