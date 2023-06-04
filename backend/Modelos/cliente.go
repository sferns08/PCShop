package modelos

import (
	"database/sql"
	"time"
)

type Cliente struct {
	Nombre    string
	Apellido  string
	Direccion string
	Telefono  string
	Email     string
	Fecha_nac time.Time
}

// Inserta un cliente en la bdd
func (c *Cliente) InsertarCliente() (string, error) {

	// Establecemos conexión con la base de datos
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		return "", err
	}
	defer db.Close()

	// Mensaje de respuesta
	var texto string

	// En caso de que no exista en la bdd lo añadimos
	if c.ExisteCliente() == 0 {

		stmt, err := db.Prepare("INSERT INTO Cliente (Nombre, Apellido, Direccion, Telefono, Email, Fecha_nac) VALUES (?, ?, ?, ?, ?, ?)")
		if err != nil {
			return "", err
		}
		defer stmt.Close()

		_, err = stmt.Exec(c.Nombre, c.Apellido, c.Direccion, c.Telefono, c.Email, c.Fecha_nac)
		if err != nil {
			return "", err
		}

		texto = "Usuario registrado con éxito: " + c.Nombre
	} else {
		texto = "Ese email ya existe."
	}

	return texto, nil
}

// Si existe el cliente devuelve 1, sino 0
func (c *Cliente) ExisteCliente() int {

	// Establecemos conexión con la base de datos
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	// Buscamos si el cliente existe en la base de datos por su email
	count := 0
	err = db.QueryRow("SELECT COUNT(*) FROM Cliente WHERE email = ?", c.Email).Scan(&count)
	if err != nil {
		panic(err.Error())
	}

	return count
}
