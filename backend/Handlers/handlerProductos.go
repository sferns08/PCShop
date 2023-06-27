package handler

import (
	modelos "backend/Modelos"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strconv"
)

// ######### HOME #########
func HandlerProductos(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	// Devuelve la lista de productos solicitado por el id de la categoria
	case "GET":
		var producto modelos.Producto
		valorNumerico := r.URL.Path[len("/productos/"):]
		id, _ := strconv.Atoi(valorNumerico)
		res := producto.GetProductos(id)
		data, err := json.Marshal(res)
		if err != nil {
			log.Println("[Error Servidor] Fallo al crear el json (Función -- handlerProductos(GET))")
		}
		w.Write(data)
	// Inserta un producto en la bdd y devuelve si se registra o no
	case "POST":

		// Leer el cuerpo del mensaje
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "[Error Servidor] Error al leer el cuerpo del mensaje (Función -- handlerProductos(POST))", http.StatusBadRequest)
			return
		}

		// Almacenar el cuerpo en un cliente
		var producto modelos.Producto
		err = json.Unmarshal(body, &producto)
		if err != nil {
			http.Error(w, "[Error Servidor] Error al parsear el cuerpo del mensaje (Función -- handlerProductos(POST))", http.StatusBadRequest)
			return
		}

		data, err := producto.InsertarProducto()
		if err != nil {
			http.Error(w, "[Error Servidor] Error al insertar el producto en la base de datos (Función -- handlerProductos(POST))", http.StatusBadRequest)
			return
		}

		// Respuesta del servidor
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(data))
	// Eliminar el producto indicado en la url de la bdd
	case "DELETE":

		// Obtener el ID del device en la petición
		var producto modelos.Producto
		idParam := r.URL.Path[len("/productos/"):]
		id, _ := strconv.ParseInt(idParam, 10, 64)
		producto.IdProducto = int32(id)

		// Eliminar el device
		err := producto.DeleteProducto()
		if err != nil {
			log.Println(w, "[Error Servidor] Error al eliminar el producto: ", id, " (Función -- handlerDevices(DELETE))")
			return
		}

		//Respuesta del servidor
		w.WriteHeader(http.StatusOK)
		return
	}
}
