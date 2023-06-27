package handler

import (
	modelos "backend/Modelos"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

// ######### HOME #########
func HandlerFactura(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	// Devuelve la lista de facturas solicitada por el id
	case "GET":

		valorNumerico := r.URL.Path[len("/factura/"):]
		id, _ := strconv.Atoi(valorNumerico)

		var factura modelos.Factura
		factura.IdFactura = int64(id)
		res := factura.GetFacturas()
		data, err := json.Marshal(res)
		if err != nil {
			log.Println("[Error Servidor] Fallo al crear el json (Función -- handlerFactura(GET))")
		}
		w.Write(data)
	}
}
