package modelos

import (
	"database/sql"
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
