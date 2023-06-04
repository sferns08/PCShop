CREATE DATABASE IF NOT EXISTS `pcshop`;
USE `pcshop`;

CREATE TABLE IF NOT EXISTS `categoria` (
  `IdCategoria` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Descripcion` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`IdCategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `cliente` (
  `IdCliente` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `Direccion` varchar(50) DEFAULT NULL,
  `Fecha_nac` date DEFAULT NULL,
  `Telefono` varchar(12) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `detalle` (
  `IdDetalle` int NOT NULL AUTO_INCREMENT,
  `IdFactura` int DEFAULT NULL,
  `IdProducto` int DEFAULT NULL,
  `Cantidad` int DEFAULT NULL,
  `Precio` float DEFAULT NULL,
  PRIMARY KEY (`IdDetalle`),
  FOREIGN KEY (`IdFactura`) REFERENCES `factura` (`IdFactura`),
  FOREIGN KEY (`IdProducto`) REFERENCES `producto` (`IdProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `factura` (
  `IdFactura` int NOT NULL AUTO_INCREMENT,
  `IdCliente` int DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `IdPago` int DEFAULT NULL,
  PRIMARY KEY (`IdFactura`),
  FOREIGN KEY (`IdCliente`) REFERENCES `cliente` (`IdCliente`),
  FOREIGN KEY (`IdPago`) REFERENCES `pago` (`IdPago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `pago` (
  `IdPago` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdPago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `producto` (
  `IdProducto` int NOT NULL AUTO_INCREMENT,
  `IdCategoria` int DEFAULT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Precio` float DEFAULT NULL,
  `Stock` int DEFAULT NULL,
  PRIMARY KEY (`IdProducto`),
  FOREIGN KEY (`IdCategoria`) REFERENCES `categoria` (`IdCategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
