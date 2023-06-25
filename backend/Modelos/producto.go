package modelos

import (
	"database/sql"
	"log"
	"strconv"
)

type Producto struct {
	IdProducto  int32
	IdCategoria int32
	Nombre      string
	Precio      float32
	Stock       int32
	Imagen      string
}

// Obtiene los productos de la categoria indicada, si es 0 devuelve todos
func (p *Producto) GetProductos(categoria int) (result []Producto) {

	// Conectamos con la base de datos
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	var rows *sql.Rows
	if categoria == 0 {
		rows, err = db.Query("SELECT * FROM producto")
	} else {
		rows, err = db.Query("SELECT * FROM producto WHERE IdCategoria = ?", categoria)
	}
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		var c1 int32
		var c2 int32
		var c3 string
		var c4 float32
		var c5 int32
		var c6 string
		err = rows.Scan(&c1, &c2, &c3, &c4, &c5, &c6)
		if err != nil {
			panic(err.Error())
		}
		var producto = Producto{
			IdProducto:  c1,
			IdCategoria: c2,
			Nombre:      c3,
			Precio:      c4,
			Stock:       c5,
			Imagen:      c6,
		}
		result = append(result, producto)
	}
	if err = rows.Err(); err != nil {
		panic(err.Error())
	}
	return result
}

func (p *Producto) InsertarProducto() (string, error) {

	// Conexión a la bdd
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	// En caso de que no exista en la bdd lo añadimos
	var respuesta string
	if p.ExisteProducto() == 0 {

		stmt, err := db.Prepare("INSERT INTO producto (IdCategoria, Nombre, Precio, Stock, Imagen) VALUES (?, ?, ?, ?, ?)")
		if err != nil {
			panic(err.Error())
		}
		defer stmt.Close()

		_, err = stmt.Exec(p.IdCategoria, p.Nombre, p.Precio, p.Stock, p.Imagen)
		if err != nil {
			panic(err.Error())
		}

		respuesta = "Producto registrado con éxito: " + p.Nombre
	} else {
		// Actualizamos el stock del producto existente
		_, err := db.Exec("UPDATE producto SET Stock = Stock + ? WHERE Nombre = ?", p.Stock, p.Nombre)
		if err != nil {
			panic(err.Error())
		}
		respuesta = "Añadido stock al producto con exito: " + strconv.Itoa(int(p.Stock))
	}

	return respuesta, nil
}

// Si existe el email devuelve 1, sino 0
func (p *Producto) ExisteProducto() int {

	// Establecemos conexión con la base de datos
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	// Buscamos si el producto existe en la base de datos por su nombre
	count := 0
	err = db.QueryRow("SELECT COUNT(*) FROM producto WHERE nombre = ? AND IdCategoria = ?", p.Nombre, p.IdCategoria).Scan(&count)
	if err != nil {
		panic(err.Error())
	}

	return count
}

// Eliminar un producto
func (p *Producto) DeleteProducto() error {

	// Conexión a la bdd
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	// Eliminación del producto
	_, err = db.Exec("DELETE FROM producto WHERE IdProducto = ?", p.IdProducto)
	if err != nil {
		log.Println("[Error Servidor] Error al preparar la petición (Función -- deleteProducto())")
		return err
	}
	log.Println("Se ha eliminado correctamente el dispositivo: ", p.IdProducto)

	return nil
}
