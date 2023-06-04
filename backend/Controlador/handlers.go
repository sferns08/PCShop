package main

import (
	modelos "backend/Modelos"
	"encoding/json"
	"io"
	"log"
	"net/http"
)

// ######### INICIO DE SESIÓN #########
func handlerSignIn(w http.ResponseWriter, r *http.Request) {

	// El POST envia los datos de loggeo
	if r.Method == "POST" {
		var cliente modelos.Cliente

		body, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println("[Error Servidor] Error al leer el cuerpo de la petición (Función -- handlerSingIn(POST))")
			return
		}
		err = json.Unmarshal(body, &cliente)
		if err != nil {
			log.Println("[Error Servidor] Error al parsear el cuerpo de la petición (Función -- handlerSingIn(POST))")
			return
		}

		cliente.InsertarCliente()
	}
}

// ######### REGISTRO #########
func handlerSignUp(w http.ResponseWriter, r *http.Request) {

	// El POST inserta un cliente en la bdd
	if r.Method == "POST" {
		var cliente modelos.Cliente

		body, err := io.ReadAll(r.Body)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("[Error Servidor] Error al leer el cuerpo de la petición (Función -- handlerSignUp(POST))"))
			return
		}
		err = json.Unmarshal(body, &cliente)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("[Error Servidor] Error al parsear el cuerpo de la petición (Función -- handlerSignUp(POST))"))
			return
		}

		data, err := cliente.InsertarCliente()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("[Error Servidor] Error al insertar el cliente en la base de datos (Función -- handlerSignUp(POST))"))
			return
		}

		w.Write([]byte(data))
	}
}

// ######### HOME #########
func handlerHome(w http.ResponseWriter, r *http.Request) {

}
