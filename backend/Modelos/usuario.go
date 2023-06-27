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
	Dni       string
	Tipo      string
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
	if u.ExisteEmail() == 0 && u.ExisteDni() == 0 {

		stmt, err := db.Prepare("INSERT INTO Usuario (Nombre, Apellido, Direccion, Telefono, Email, Fecha_nac, Password, Dni) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
		if err != nil {
			panic(err.Error())
		}
		defer stmt.Close()

		_, err = stmt.Exec(u.Nombre, u.Apellido, u.Direccion, u.Telefono, u.Email, u.Fecha_nac, u.Password, u.Dni)
		if err != nil {
			panic(err.Error())
		}

		respuesta = "Usuario registrado con éxito: " + u.Email
	} else if u.ExisteEmail() != 0 {
		respuesta = "[Error] Usuario no registrado, ese Email ya existe."
	} else {
		respuesta = "[Error] Usuario no registrado, ese Dni ya existe."
	}

	return respuesta, nil
}

// Si existe el email devuelve 1, sino 0
func (u *Usuario) ExisteEmail() int {

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

// Si existe el email devuelve 1, sino 0
func (u *Usuario) ExisteDni() int {

	// Establecemos conexión con la base de datos
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	// Buscamos si el usuario existe en la base de datos por su email
	count := 0
	err = db.QueryRow("SELECT COUNT(*) FROM Usuario WHERE Dni = ?", u.Dni).Scan(&count)
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

// Obtiene los usuarios del id indicado, si es 0 devuelve todos
func (u *Usuario) GetUsuarios() (result []Usuario) {
	// Conectamos con la base de datos
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	var rows *sql.Rows
	if u.IdUsuario == 0 {
		rows, err = db.Query("SELECT * FROM usuario")
	} else {
		rows, err = db.Query("SELECT * FROM usuario WHERE IdUsuario= ?", u.IdUsuario)
	}
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		var c1 int
		var c2 string
		var c3 string
		var c4 string
		var c5 string
		var c6 string
		var c7 string
		var c8 string
		var c9 string
		var c10 string

		err = rows.Scan(&c1, &c2, &c3, &c4, &c5, &c6, &c7, &c8, &c9, &c10)
		if err != nil {
			panic(err.Error())
		}

		fecha, err := time.Parse("2006-01-02", c5)
		if err != nil {
			panic(err.Error())
		}

		var usuario = Usuario{
			IdUsuario: c1,
			Nombre:    c2,
			Apellido:  c3,
			Direccion: c4,
			Fecha_nac: fecha,
			Telefono:  c6,
			Email:     c7,
			Password:  c8,
			Dni:       c9,
			Tipo:      c10,
		}
		result = append(result, usuario)
	}
	if err = rows.Err(); err != nil {
		panic(err.Error())
	}
	return result
}
