package modelos

type Pedido struct {
	IdPedido  int64
	IdFactura int64
	IdPrecio  int64
	Cantidad  int64
	Precio    float32
}
