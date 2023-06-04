package modelos

import "time"

type Factura struct {
	IdFactura int64
	IdCliente int64
	IdPago    int64
	Fecha     time.Time
}
