package handler

import (
	modelos "backend/Modelos"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

// ######### HOME #########
func HandlerProductos(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		var producto modelos.Producto
		valorNumerico := r.URL.Path[len("/productos/"):]
		id, _ := strconv.Atoi(valorNumerico)
		res := producto.GetProductos(id)
		data, err := json.Marshal(res)
		if err != nil {
			log.Println("[Error Servidor] Fallo al crear el json (Función -- handlerProductos(GET))")
		}
		w.Write(data)
	}
}
