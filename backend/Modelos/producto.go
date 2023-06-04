package modelos

type Producto struct {
	IdProducto  int64
	IdCategoria int64
	IdPago      int64
	Nombre      string
	Precio      float32
	Stock       int64
}
