package modelos

import (
	"database/sql"
	"time"
)

type Usuario struct {
	IdUsuario int
	Nombre    string
	Apellido  string
	Direccion string
	Fecha_nac time.Time
	Telefono  string
	Email     string
	Password  string
}

// Inserta un cliente en la bdd y devuelve si se registra o ya existe
func (u *Usuario) InsertarUsuario() (string, error) {

	// Conexión a la bdd
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	// En caso de que no exista en la bdd lo añadimos
	var respuesta string
	if u.ExisteUsuario() == 0 {

		stmt, err := db.Prepare("INSERT INTO Usuario (Nombre, Apellido, Direccion, Telefono, Email, Fecha_nac, Password) VALUES (?, ?, ?, ?, ?, ?, ?)")
		if err != nil {
			panic(err.Error())
		}
		defer stmt.Close()

		_, err = stmt.Exec(u.Nombre, u.Apellido, u.Direccion, u.Telefono, u.Email, u.Fecha_nac, u.Password)
		if err != nil {
			panic(err.Error())
		}

		respuesta = "Usuario registrado con éxito: " + u.Email
	} else {
		respuesta = "Ese email ya existe."
	}

	return respuesta, nil
}

// Si existe el usuario devuelve 1, sino 0
func (u *Usuario) ExisteUsuario() int {

	// Establecemos conexión con la base de datos
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	// Buscamos si el usuario existe en la base de datos por su email
	count := 0
	err = db.QueryRow("SELECT COUNT(*) FROM Usuario WHERE Email = ?", u.Email).Scan(&count)
	if err != nil {
		panic(err.Error())
	}

	return count
}

// Si esta bien logeado devuelve el id del usuario sino 0 en caso de error -1
func (u *Usuario) LogearUsuario() int32 {

	// Establecemos conexión con la base de datos
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		return -1
	}
	defer db.Close()

	// Si existe en base de datos devuelve su id
	var index int32 = 0
	err = db.QueryRow("SELECT IdUsuario FROM usuario WHERE Email = ? AND Password = ?", u.Email, u.Password).Scan(&index)
	if err != nil {
		return -1
	}
	return index
}
