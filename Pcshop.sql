-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.32 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for pcshop
CREATE DATABASE IF NOT EXISTS `pcshop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pcshop`;

-- Dumping structure for table pcshop.categoria
CREATE TABLE IF NOT EXISTS `categoria` (
  `IdCategoria` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Descripcion` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`IdCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table pcshop.categoria: ~4 rows (approximately)
INSERT INTO `categoria` (`IdCategoria`, `Nombre`, `Descripcion`) VALUES
	(1, 'Smartphones', 'moviles y accesorios para moviles'),
	(2, 'Perifericos', 'ratones, webcams, teclados'),
	(3, 'Ordenadores', 'ordenadores gaming de ultima generacion'),
	(4, 'Televisores', 'los ultimos modelos de teles planas');

-- Dumping structure for table pcshop.factura
CREATE TABLE IF NOT EXISTS `factura` (
  `IdFactura` int NOT NULL AUTO_INCREMENT,
  `IdCliente` int DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `IdPago` int DEFAULT NULL,
  PRIMARY KEY (`IdFactura`),
  KEY `IdCliente` (`IdCliente`),
  KEY `IdPago` (`IdPago`),
  CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`IdCliente`) REFERENCES `usuario` (`IdUsuario`),
  CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`IdPago`) REFERENCES `pago` (`IdPago`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table pcshop.factura: ~0 rows (approximately)

-- Dumping structure for table pcshop.pago
CREATE TABLE IF NOT EXISTS `pago` (
  `IdPago` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdPago`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table pcshop.pago: ~3 rows (approximately)
INSERT INTO `pago` (`IdPago`, `Nombre`) VALUES
	(1, 'Visa'),
	(2, 'Mastercard'),
	(3, 'American Express');

-- Dumping structure for table pcshop.pedido
CREATE TABLE IF NOT EXISTS `pedido` (
  `IdPedido` int NOT NULL AUTO_INCREMENT,
  `IdFactura` int DEFAULT NULL,
  `IdProducto` int DEFAULT NULL,
  `Cantidad` int DEFAULT NULL,
  `Precio` float DEFAULT NULL,
  `Direccion` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`IdPedido`) USING BTREE,
  KEY `IdFactura` (`IdFactura`),
  KEY `IdProducto` (`IdProducto`),
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`IdFactura`) REFERENCES `factura` (`IdFactura`),
  CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`IdProducto`) REFERENCES `producto` (`IdProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table pcshop.pedido: ~0 rows (approximately)

-- Dumping structure for table pcshop.producto
CREATE TABLE IF NOT EXISTS `producto` (
  `IdProducto` int NOT NULL AUTO_INCREMENT,
  `IdCategoria` int DEFAULT NULL,
  `Nombre` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Precio` float DEFAULT NULL,
  `Stock` int DEFAULT NULL,
  `Imagen` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`IdProducto`),
  KEY `IdCategoria` (`IdCategoria`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`IdCategoria`) REFERENCES `categoria` (`IdCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table pcshop.producto: ~12 rows (approximately)
INSERT INTO `producto` (`IdProducto`, `IdCategoria`, `Nombre`, `Precio`, `Stock`, `Imagen`) VALUES
	(1, 3, 'MSI Crosshair 17 C12VF-264XES Intel Core i7-12650H/32GB/1TB SSD/RTX 4060/17.3', 1399, 38, 'https://thumb.pccomponentes.com/w-300-300/articles/1067/10672822/1150-msi-crosshair-17-c12vf-264xes-intel-core-i7-12650h-32gb-1tb-ssd-rtx-4060-173-3f9f42ce-2559-4d05-af10-f8d0a23c57de.jpg'),
	(2, 3, 'MSI Katana GF66 12UC-082XES Intel Core i7-12700H/16GB/1TB SSD/RTX3050/15.6', 900, 12, 'https://thumb.pccomponentes.com/w-300-300/articles/1001/10011004/1466-msi-katana-gf66-12ud-082xes-intel-core-i7-12700h-16gb-1tb-ssd-rtx3050-156-3b7c3f62-ac49-4155-bcd2-35f217618c49.jpg'),
	(3, 3, 'MSI GF63 Thin 11UC-446XES Intel Core i7-11800H/16GB/512GB SSD/RTX 3050/15.6', 679, 20, 'https://thumb.pccomponentes.com/w-300-300/articles/83/837985/1667-msi-gf63-thin-11uc-446xes-intel-core-i7-11800h-16gb-512gb-ssd-rtx-3050-156.jpg'),
	(4, 2, 'Logitech MK470 Slim Combo Teclado + Ratón Inalámbricos Blanco', 40, 10, 'https://thumb.pccomponentes.com/w-300-300/articles/32/320884/1176-logitech-mk470-slim-combo-teclado-raton-inalambricos-blanco.jpg'),
	(5, 2, 'Logitech MX Anywhere 3 Ratón Compacto Inalámbrico 4000DPI Grafito', 23.45, 12, 'https://thumb.pccomponentes.com/w-300-300/articles/1063/10636723/1998-logitech-mx-anywhere-3-for-business-raton-inalambrico-4000dpi-grafito.jpg'),
	(6, 2, 'Razer Kiyo X Webcam USB 1080P', 26.75, 20, 'https://thumb.pccomponentes.com/w-530-530/articles/69/690202/1206-razer-kiyo-x-webcam-usb-1080p.jpg'),
	(7, 1, 'Xiaomi Redmi Note 11S 6/128GB Gris Libre', 890, 10, 'https://thumb.pccomponentes.com/w-300-300/articles/1019/10190752/159-xiaomi-redmi-note-11s-6-128gb-gris-libre.jpg'),
	(8, 1, 'Samsung Galaxy M23 5G 4/128GB Azul Libre', 970, 12, 'https://thumb.pccomponentes.com/w-300-300/articles/1018/10186126/1485-samsung-galaxy-m23-5g-4-128gb-azul-libre.jpg'),
	(9, 1, 'POCO M4 5G 6/128GB Negro Libre', 785, 20, 'https://thumb.pccomponentes.com/w-300-300/articles/1058/10585049/1970-poco-m4-5g-6-128gb-negro-libre.jpg'),
	(10, 4, 'LG 32LQ631C 32" LED FullHD HDR', 470, 10, 'https://thumb.pccomponentes.com/w-300-300/articles/1065/10658868/1568-lg-32lq631c-32-led-fullhd-hdr.jpg'),
	(11, 4, 'LG 43NANO766QA 43" LED NanoCell UltraHD 4K HDR10 Pro', 670.75, 12, 'https://thumb.pccomponentes.com/w-300-300/articles/1024/10241255/1424-lg-43nano766qa-43-led-nanocell-ultrahd-4k-hdr10-pro.jpg'),
	(12, 4, 'LG 50UQ81003LB 50" LED UltraHD 4K HDR10 Pro', 980.7, 20, 'https://thumb.pccomponentes.com/w-530-530/articles/1062/10622660/1762-lg-50uq81003lb-50-led-ultrahd-4k-hdr10-pro.jpg');

-- Dumping structure for table pcshop.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `IdUsuario` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `Direccion` varchar(50) DEFAULT NULL,
  `Fecha_nac` date DEFAULT NULL,
  `Telefono` varchar(12) DEFAULT NULL,
  `Email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `Dni` varchar(10) NOT NULL,
  `Tipo` char(50) NOT NULL DEFAULT 'C',
  PRIMARY KEY (`IdUsuario`) USING BTREE,
  UNIQUE KEY `Unique` (`Email`,`Dni`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table pcshop.usuario: ~1 rows (approximately)
INSERT INTO `usuario` (`IdUsuario`, `Nombre`, `Apellido`, `Direccion`, `Fecha_nac`, `Telefono`, `Email`, `Password`, `Dni`, `Tipo`) VALUES
	(1, 'Admin', 'Admin', 'avd. la universidad, 5, Leon', '2023-06-25', '111001100', 'admin@admin.com', '0', '000000000', 'A');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
