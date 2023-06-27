package main

import (
	manejadoras "backend/Handlers"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/rs/cors"
)

func main() {

	//Definimos el puerto por defecto
	port := ":8080"

	//Creamos un multiplexor de manejadoras
	mux := http.NewServeMux()
	mux.HandleFunc("/usuarios/", manejadoras.HandlerUsuarios)
	mux.HandleFunc("/inicioSesion/", manejadoras.HandlerInicioSesion)
	mux.HandleFunc("/productos/", manejadoras.HandlerProductos)
	mux.HandleFunc("/pedido/", manejadoras.HandlerPedido)
	mux.HandleFunc("/factura/", manejadoras.HandlerFactura)

	//Habilitamos las cors
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:8080"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization", "Custom-Header", "Cookie", "categoria"},
		AllowCredentials: true,
	})
	handler := c.Handler(mux)

	//Lanzamos el servidor
	log.Println("Servidor en ejecución en http://localhost", port)
	err := http.ListenAndServe(port, handler)
	if err != nil {
		log.Println("Ha habido uno error: ", err)
	}

}
