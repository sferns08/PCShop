package handler

import (
	modelos "backend/Modelos"
	"encoding/json"
	"io"
	"net/http"
)

// ######### REGISTRO #########
func HandlerUsuarios(w http.ResponseWriter, r *http.Request) {

	// El POST inserta un cliente en la bdd y devuelve si se registra o no
	if r.Method == "POST" {

		// Leer el cuerpo del mensaje
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "[Error Servidor] Error al leer el cuerpo del mensaje (Función -- handlerUsuarios(POST))", http.StatusBadRequest)
			return
		}

		// Almacenar el cuerpo en un cliente
		var usuario modelos.Usuario
		err = json.Unmarshal(body, &usuario)
		if err != nil {
			http.Error(w, "[Error Servidor] Error al parsear el cuerpo del mensaje (Función -- handlerUsuarios(POST))", http.StatusBadRequest)
			return
		}

		data, err := usuario.InsertarUsuario()
		if err != nil {
			http.Error(w, "[Error Servidor] Error al insertar el usuario en la base de datos (Función -- handlerUsuarios(POST))", http.StatusBadRequest)
			return
		}

		// Respuesta del servidor
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(data))
	}
}
