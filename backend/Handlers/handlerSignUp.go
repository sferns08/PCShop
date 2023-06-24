package handler

import (
	modelos "backend/Modelos"
	"encoding/json"
	"io"
	"log"
	"net/http"
)

// ######### REGISTRO #########
func HandlerSignUp(w http.ResponseWriter, r *http.Request) {

	// El POST inserta un cliente en la bdd y devuelve si se registra o no
	if r.Method == "POST" {
		var cliente modelos.Cliente

		body, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println("Error: ", err)
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("[Error Servidor] Error al leer el cuerpo de la petición (Función -- handlerSignUp(POST))"))
			return
		}
		err = json.Unmarshal(body, &cliente)
		if err != nil {
			log.Println("Error: ", err)
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("[Error Servidor] Error al parsear el cuerpo de la petición (Función -- handlerSignUp(POST))"))
			return
		}

		// Se inserta al cliente en bdd
		data, err := cliente.InsertarCliente()
		if err != nil {
			log.Println("Error: ", err)
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("[Error Servidor] Error al insertar el cliente en la base de datos (Función -- handlerSignUp(POST))"))
			return
		}

		// Respuesta del servidor
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(data))
	}
}
