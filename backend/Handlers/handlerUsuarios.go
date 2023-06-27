package handler

import (
	modelos "backend/Modelos"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strconv"
)

// ######### REGISTRO #########
func HandlerUsuarios(w http.ResponseWriter, r *http.Request) {

	// El POST inserta un cliente en la bdd y devuelve si se registra o no
	switch r.Method {
	case "POST":

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
	case "GET":

		valorNumerico := r.URL.Path[len("/usuarios/"):]
		id, _ := strconv.Atoi(valorNumerico)

		var usuario modelos.Usuario
		usuario.IdUsuario = id
		res := usuario.GetUsuarios()
		data, err := json.Marshal(res)
		if err != nil {
			log.Println("[Error Servidor] Fallo al crear el json (Función -- handlerFactura(GET))")
		}
		w.Write(data)
	}
}
