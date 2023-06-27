package handler

import (
	modelos "backend/Modelos"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strconv"
	"time"
)

func HandlerPedido(w http.ResponseWriter, r *http.Request) {

	// Añade un pedido a la bdd
	switch r.Method {
	case "POST":
		// Leer el cuerpo del mensaje
		body, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println("[Error Servidor] Error al leer el cuerpo del mensaje (Función -- handlerPedido(POST))")
			http.Error(w, "[Error Servidor] Error al leer el cuerpo del mensaje (Función -- handlerPedido(POST))", http.StatusBadRequest)
			return
		}

		// Almacenar el cuerpo en un cliente
		var pedido modelos.Pedido
		err = json.Unmarshal(body, &pedido)
		if err != nil {
			log.Println("[Error Servidor] Error al parsear el cuerpo del mensaje (Función -- handlerPedido(POST))")
			http.Error(w, "[Error Servidor] Error al parsear el cuerpo del mensaje (Función -- handlerPedido(POST))", http.StatusBadRequest)
			return
		}

		var factura modelos.Factura
		valorNumerico := r.URL.Path[len("/pedido/"):]
		idUsuario, _ := strconv.Atoi(valorNumerico)
		factura.IdCliente = int64(idUsuario)
		factura.IdPago = pedido.IdPago
		factura.Fecha = time.Now()
		//Devuelve el indice de la factura
		pedido.IdFactura, err = factura.InsertarFactura()
		if err != nil {
			log.Println("[Error Servidor] Error al insertar la factura en la base de datos (Función -- handlerPedido(POST))")
			http.Error(w, "[Error Servidor] Error al insertar la factura en la base de datos (Función -- handlerPedido(POST))", http.StatusBadRequest)
			return
		}

		index, err := pedido.InsertarPedido()
		if err != nil {
			log.Println("[Error Servidor] Error al insertar el pedido en la base de datos (Función -- handlerPedido(POST))")
			http.Error(w, "[Error Servidor] Error al insertar el pedido en la base de datos (Función -- handlerPedido(POST))", http.StatusBadRequest)
			return
		}
		data := strconv.FormatInt(index, 10)

		// Respuesta del servidor
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(data))
	// Devuelve el pedido solicitado
	case "GET":
		valorNumerico := r.URL.Path[len("/pedido/"):]
		id, _ := strconv.Atoi(valorNumerico)
		var pedido modelos.Pedido
		pedido.IdPedido = int64(id)
		res := pedido.GetPedidos()
		data, err := json.Marshal(res)
		if err != nil {
			log.Println("[Error Servidor] Fallo al crear el json (Función -- handlerPredidos(GET))")
		}
		w.Write(data)
	}
}
