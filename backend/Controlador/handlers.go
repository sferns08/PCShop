package main

import (
	modelos "backend/Modelos"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strconv"
	"time"
)

// ######### INICIO DE SESIÓN #########
func handlerSignIn(w http.ResponseWriter, r *http.Request) {

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

// ######### REGISTRO #########
func handlerSignUp(w http.ResponseWriter, r *http.Request) {

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

// ######### HOME #########
func handlerHome(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		var producto modelos.Producto
		valorNumerico := r.URL.Path[len("/home/"):]
		id, _ := strconv.Atoi(valorNumerico)
		res := producto.GetProductos(id)
		data, err := json.Marshal(res)
		if err != nil {
			log.Println("[Error Servidor] Fallo al crear el json (Función -- handlerUser(GET))")
		}
		w.Write(data)
	}
}
