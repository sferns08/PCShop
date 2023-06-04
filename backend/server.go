package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

// Estructuras
type Cliente struct {
	Nombre    string
	Apellido  string
	Direccion string
	Telefono  string
	Email     string
	Fecha_nac time.Time
}
type Categoria struct {
	IdCategoria int64
	Nombre      string
	Descripciom string
}
type Detalle struct {
	IdDetalle int64
	IdFactura int64
	IdPrecio  int64
	Cantidad  int64
	Precio    float32
}

type Factura struct {
	IdFactura int64
	IdCliente int64
	IdPago    int64
	Fecha     time.Time
}

type Producto struct {
	IdProducto  int64
	IdCategoria int64
	IdPago      int64
	Nombre      string
	Precio      float32
	Stock       int64
}

type Pago struct {
	IdPago int64
	Nombre string
}

func main() {
	//Conectamos consuta
	dataBaseConn()
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

// ######### HANDLER SIGNIN #########
func handleSignin(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" { // Lógica para manejar POST requests
		var user Cliente
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Println("[Error Servidor] Error al leer el cuerpo de la petición (Función -- handlerSingIn(POST))")
			return
		}
		err = json.Unmarshal(body, &user)
		if err != nil {
			log.Println("[Error Servidor] Error al parsear el cuerpo de la petición (Función -- handlerSingIn(POST))")
			return
		}
		newUser(&user)
	}
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

// Conexion a la base de datos
func dataBaseConn() {
	log.Println("Conectando a la base de datos...")
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	rows, err := db.Query("SELECT * FROM categoria")
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		var id int
		var nombre string
		var descripcion string
		err := rows.Scan(&id, &nombre, &descripcion)
		if err != nil {
			panic(err.Error())
		}
		log.Println(id, nombre, descripcion)
	}

	if err := rows.Err(); err != nil {
		log.Println("Error al iterar filas:", err)
		// Manejar el error según sea necesario
	}
	log.Println("Consulta finalizada.")

}

// Añade un usuario a la base de datos
func newUser(usuario *Cliente) error {
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	log.Println("Intentando registrar: ", usuario.Fecha_nac)
	count := 0 //Comprobamos si el elemento exite en la base de datos
	err = db.QueryRow("SELECT COUNT(*) FROM Cliente WHERE email = ?", usuario.Email).Scan(&count)
	if err != nil {
		panic(err.Error())
	}
	if count == 0 { //Si no existe lo insertamos

		stmt, err := db.Prepare("INSERT INTO Cliente ( Nombre, Apellido, Direccion, Telefono, Email, Fecha_nac) VALUES (?,?,?,?,?,?)")
		if err != nil {
			panic(err.Error())
		}
		_, err = stmt.Exec(usuario.Nombre, usuario.Apellido, usuario.Direccion, usuario.Telefono, usuario.Email, usuario.Fecha_nac)
		if err != nil {
			panic(err.Error())
		}
		log.Println("Usuario registrado con exito:", usuario.Nombre)
	}
	return nil
}
