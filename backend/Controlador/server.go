package main

import (
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
	mux.HandleFunc("/signIn", handlerSignIn)
	mux.HandleFunc("/signUp", handlerSignUp)
	mux.HandleFunc("/home", handlerHome)

	//Habilitamos las cors
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
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
