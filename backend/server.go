package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"time"
)

func main() {
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Cadena de conexión a la base de datos MySQL
	connectionString := "root:admin@tcp(localhost:3306)/pcshop"

	// Abrir la conexión a la base de datos
	db, err := sql.Open("mysql", connectionString)
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Manejadores de ruta
	http.HandleFunc("/", handleMain)
	http.HandleFunc("/login", handleLogin)
	http.HandleFunc("/signin", handleSignin)
	http.HandleFunc("/inicio", handleInicio)

	// Middleware para CORS
	corsHandler := enableCORS(http.DefaultServeMux)

	// Iniciar el servidor en el puerto 8080
	fmt.Println("Servidor en ejecución en http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", corsHandler))
}

// Middleware para permitir CORS
func enableCORS(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Permitir solicitudes desde cualquier origen
		w.Header().Set("Access-Control-Allow-Origin", "*")
		// Permitir los métodos GET, POST, y OPTIONS
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		// Permitir los encabezados "Origin", "Content-Type", y "Authorization"
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")

		// Si la solicitud es de tipo OPTIONS, responder con éxito (200)
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Pasar la solicitud al siguiente manejador
		handler.ServeHTTP(w, r)
	})
}

// Manejador para la ruta /login
func handleLogin(w http.ResponseWriter, r *http.Request) {
	// Lógica para manejar la solicitud de /login
	fmt.Fprintf(w, `<html>
		<head>
			<title>Página de login</title>
		</head>
		<body>
			<h1>¡Bienvenido a la página de login!</h1>
			<form action="/login" method="POST">
				<button type="submit">Enviar</button>
			</form>
		</body>
	</html>`)
	log.Print(r.Cookies())
	if r.Method == "POST" {
		// Obtener el valor del campo enviado en el formulario
		value := "Sergio" // Cambia aquí el valor a almacenar en la cookie

		expiresAt := time.Now().Add(3600 * time.Second)
		cookie := http.Cookie{
			Name:     "jwt",
			Value:    value,
			Expires:  expiresAt,
			SameSite: http.SameSiteNoneMode,
			Secure:   true,
			HttpOnly: false,
		}
		http.SetCookie(w, &cookie)
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Cookie almacenada"))
	}
}

// Manejador para la ruta /signin
func handleSignin(w http.ResponseWriter, r *http.Request) {
	// Lógica para manejar la solicitud de /signin
	fmt.Fprintf(w, "¡Bienvenido a la página de signin!")
}

// Manejador para la ruta /inicio
func handleInicio(w http.ResponseWriter, r *http.Request) {
	// Lógica para manejar la solicitud de /inicio
	fmt.Fprintf(w, "¡Bienvenido a la página de inicio!")
}

// Manejador para la ruta /main
func handleMain(w http.ResponseWriter, r *http.Request) {
	// Lógica para manejar la solicitud de /main
	fmt.Fprintf(w, "¡Bienvenido a la página main!")
}
