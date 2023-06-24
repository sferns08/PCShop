package handler

import (
	modelos "backend/Modelos"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"time"
)

// ######### INICIO DE SESIÓN #########
func HandlerSignIn(w http.ResponseWriter, r *http.Request) {

	// El POST envia los datos de loggeo y devuelve el id con una cookie si se inicia sesión o un 0 sino
	if r.Method == "POST" {
		var cliente modelos.Cliente

		body, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println("Error: ", err)
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("[Error Servidor] Error al leer el cuerpo de la petición (Función -- handlerSignIn(POST))"))
			return
		}

		err = json.Unmarshal(body, &cliente)
		if err != nil {
			log.Println("Error: ", err)
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("[Error Servidor] Error al parsear el cuerpo de la petición (Función -- handlerSignIn(POST))"))
			return
		}

		// Loggea al cliente
		index, err := cliente.LogearCliente()
		if err != nil {
			log.Println("Error: ", err)
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("[Error Servidor] Error al loggearse (Función -- handlerSignIn(POST))"))
			return
		}

		var data string

		// Si está bien loggeado
		if index != 0 {

			//Se crea la cookie y se almacena
			valor := string(index)
			expiresAt := time.Now().Add(5 * time.Second)
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
