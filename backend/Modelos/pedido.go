package modelos

import (
	"database/sql"
	"log"
)

type Pedido struct {
	IdPedido   int64
	IdFactura  int64
	IdProducto int64
	Cantidad   int64
	Precio     float32
	Direccion  string
	IdPago     int64
}

// Obtiene los pedidos del id indicado, si es 0 devuelve todos
func (p *Pedido) GetPedidos() (result []Pedido) {

	// Conectamos con la base de datos
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	var rows *sql.Rows
	if p.IdPedido == 0 {
		rows, err = db.Query("SELECT * FROM pedido")
	} else {
		rows, err = db.Query("SELECT * FROM pedido WHERE IdPedido = ?", p.IdPedido)
	}
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		var c1 int64
		var c2 int64
		var c3 int64
		var c4 int64
		var c5 float32
		var c6 string
		err = rows.Scan(&c1, &c2, &c3, &c4, &c5, &c6)
		if err != nil {
			panic(err.Error())
		}
		var pedido = Pedido{
			IdPedido:   c1,
			IdFactura:  c2,
			IdProducto: c3,
			Cantidad:   c4,
			Precio:     c5,
			Direccion:  c6,
		}
		result = append(result, pedido)
	}
	if err = rows.Err(); err != nil {
		panic(err.Error())
	}
	return result
}

// Devuelve el id del pedido realizado
func (p *Pedido) InsertarPedido() (int64, error) {
	// Conexión a la bdd
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	result, err := db.Exec("INSERT INTO pedido (IdFactura, IdProducto, Cantidad, Precio, Direccion) VALUES (?, ?, ?, ?, ?)", p.IdFactura, p.IdProducto, p.Cantidad, p.Precio, p.Direccion)
	if err != nil {
		panic(err.Error())
	}

	id, err := result.LastInsertId()
	if err != nil {
		panic(err.Error())
	}

	return id, nil
}

// Eliminar un pedido
func (p *Pedido) DeletePedido() error {

	// Conexión a la bdd
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	// Eliminación del pedido
	_, err = db.Exec("DELETE FROM pedido WHERE IdPedido = ?", p.IdPedido)
	if err != nil {
		log.Println("[Error Servidor] Error al preparar la petición (Función -- deletePedido())")
		return err
	}
	log.Println("Se ha eliminado correctamente el pedido: ", p.IdPedido)

	return nil
}
