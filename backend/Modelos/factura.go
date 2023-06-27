package modelos

import (
	"database/sql"
	"time"
)

type Factura struct {
	IdFactura int64
	IdCliente int64
	Fecha     time.Time
	IdPago    int64
}

// Obtiene las facturas del id indicado, si es 0 devuelve todas
func (f *Factura) GetFacturas() (result []Factura) {

	// Conectamos con la base de datos
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	var rows *sql.Rows
	if f.IdFactura == 0 {
		rows, err = db.Query("SELECT * FROM factura")
	} else {
		rows, err = db.Query("SELECT * FROM factura WHERE IdFactura = ?", f.IdFactura)
	}
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		var c1 int64
		var c2 int64
		var c3 string
		var c4 int64
		err = rows.Scan(&c1, &c2, &c3, &c4)
		if err != nil {
			panic(err.Error())
		}
		fecha, err := time.Parse("2006-01-02", c3)
		if err != nil {
			panic(err.Error())
		}
		var factura = Factura{
			IdFactura: c1,
			IdCliente: c2,
			Fecha:     fecha,
			IdPago:    c4,
		}
		result = append(result, factura)
	}
	if err = rows.Err(); err != nil {
		panic(err.Error())
	}
	return result
}

func (f *Factura) InsertarFactura() (int64, error) {

	// Conexión a la bdd
	db, err := sql.Open("mysql", "root:admin@/pcshop")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	result, err := db.Exec("INSERT INTO factura (IdCliente, IdPago, Fecha) VALUES (?, ?, ?)", f.IdCliente, f.IdPago, f.Fecha)
	if err != nil {
		panic(err.Error())
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return id, nil
}
