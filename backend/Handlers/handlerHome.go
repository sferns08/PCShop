package handler

import (
	modelos "backend/Modelos"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

// ######### HOME #########
func HandlerHome(w http.ResponseWriter, r *http.Request) {
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
