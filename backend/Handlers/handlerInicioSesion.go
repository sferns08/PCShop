package handler

import (
	modelos "backend/Modelos"
	"encoding/json"
	"io"
	"net/http"
	"time"
)

// ######### INICIO DE SESIÓN #########
func HandlerInicioSesion(w http.ResponseWriter, r *http.Request) {

	// El POST envia los datos de loggeo y devuelve el id con una cookie si se inicia sesión o un 0 sino
	if r.Method == "POST" {

		// Leer el cuerpo del mensaje
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "[Error Servidor] Error al leer el cuerpo del mensaje (Función -- handlerInicoSesion(POST))", http.StatusBadRequest)
			return
		}

		// Almacenar el cuerpo en un cliente
		var usuario modelos.Usuario
		err = json.Unmarshal(body, &usuario)
		if err != nil {
			http.Error(w, "[Error Servidor] Error al parsear el cuerpo del mensaje (Función -- handlerInicioSesion(POST))", http.StatusBadRequest)
			return
		}

		// Loggea al cliente
		index := usuario.LogearUsuario()
		if index == -1 {
			http.Error(w, "[Error Servidor] Error al loggearse (Función -- handlerInicioSesion(POST))", http.StatusBadRequest)
			return
		}

		// Si está bien loggeado
		var data string
		if index > 0 {
			//Se crea la cookie y se almacena
			valor := string(index)
			expiresAt := time.Now().Add(3600 * time.Second)
			cookie := http.Cookie{
				Name:     "jwt",
				Value:    valor,
				Expires:  expiresAt,
				SameSite: http.SameSiteNoneMode,
				Secure:   true,
				HttpOnly: false,
			}
			data = cookie.String()
			http.SetCookie(w, &cookie)
		} else {
			data = "0"
		}

		// Respuesta del servidor
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(data))
	}
}
