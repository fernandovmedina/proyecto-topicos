package handlers

import (
	"log"
	"net/http"

	"github.com/fernandovmedina/proyecto-topicos/src/database"
	"github.com/fernandovmedina/proyecto-topicos/src/functions"
	"github.com/fernandovmedina/proyecto-topicos/src/models"

	"github.com/gofiber/fiber/v2"
)

// Funcion para obtener todos los vuelos disponibles
func GetVuelosDisponibles(c *fiber.Ctx) error {
	var vuelos []models.VueloDisponible

	if c.IP() == "127.0.0.1" {
		log.Println("192.168.0.157")
	} else {
		log.Println(c.IP())
	}

	rows, err := database.DB.Query("SELECT VD.ID_VUELO_DISPONIBLE, PD.NOMBRE AS PUNTO_DE_PARTIDA, D.NOMBRE AS DESTINO, VD.FECHA FROM VUELOS_DISPONIBLES VD LEFT JOIN DESTINOS PD ON VD.ID_PUNTO_DE_PARTIDA = PD.ID_DESTINO LEFT JOIN DESTINOS D ON VD.ID_DESTINO = D.ID_DESTINO")

	if err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusInternalServerError,
			"message":     err,
		})
	}

	defer rows.Close()

	for rows.Next() {
		var vuelo = new(models.VueloDisponible)

		if err = rows.Scan(&vuelo.Id, &vuelo.Partida, &vuelo.Destino, &vuelo.Fecha); err != nil {
			return c.JSON(fiber.Map{
				"success":     false,
				"status_code": http.StatusInternalServerError,
				"message":     err,
			})
		}

		vuelos = append(vuelos, *vuelo)
	}

	return c.JSON(fiber.Map{
		"success":     true,
		"status_code": http.StatusOK,
		"data":        &vuelos,
	})
}

// Funcion para obtener todos los vuelos que un cliente ha realizado
func GetVuelosCliente(c *fiber.Ctx) error {
	var vuelos []models.VueloCliente

	if c.IP() == "127.0.0.1" {
		log.Println("192.168.0.157")
	} else {
		log.Println(c.IP())
	}

	var email = c.Query("email")

	rows, err := database.DB.Query("SELECT VUELOS.NUMERO_DE_VUELO, PARTIDA.NOMBRE AS PUNTO_DE_PARTIDA, DESTINOS.NOMBRE AS DESTINO FROM CLIENTE_has_VUELOS JOIN VUELOS ON CLIENTE_has_VUELOS.ID_VUELO = VUELOS.ID_VUELO JOIN DESTINOS AS PARTIDA ON VUELOS.ID_PUNTO_DE_PARTIDA = PARTIDA.ID_DESTINO JOIN DESTINOS ON VUELOS.ID_DESTINO = DESTINOS.ID_DESTINO WHERE CLIENTE_has_VUELOS.ID_CLIENTE = (SELECT ID_CLIENTE FROM CLIENTES WHERE EMAIL = ?)", &email)

	if err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusInternalServerError,
			"message":     err,
		})
	}

	defer rows.Close()

	for rows.Next() {
		var v = new(models.VueloCliente)

		if err = rows.Scan(&v.Numero, &v.Partida, &v.Destino); err != nil {
			return c.JSON(fiber.Map{
				"success":     false,
				"status_code": http.StatusInternalServerError,
				"message":     err,
			})
		}

		vuelos = append(vuelos, *v)
	}

	return c.JSON(fiber.Map{
		"success":     true,
		"status_code": http.StatusOK,
		"data":        &vuelos,
	})
}

// Funcion para obtener las coordenadas del vuelo
func GetCoordenadas(c *fiber.Ctx) error {
	x, y, z := functions.GetCoordenadasVuelo(c.Query("numero"))

	if c.IP() == "127.0.0.1" {
		log.Println("192.168.0.157")
	} else {
		log.Println(c.IP())
	}

	return c.JSON(fiber.Map{
		"success":     true,
		"status_code": http.StatusOK,
		"x":           x,
		"y":           y,
		"z":           z,
	})
}

// Funcion para obtener los datos de cierto vuelo al momento de rastrearlo
func RastrearVuelo(c *fiber.Ctx) error {
	var numero = c.Query("numero")

	if c.IP() == "127.0.0.1" {
		log.Println("192.168.0.157")
	} else {
		log.Println(c.IP())
	}

	var v = new(models.VueloRastreo)

	rows, err := database.DB.Query("SELECT VUELOS.NUMERO_DE_VUELO, PARTIDA.NOMBRE AS PUNTO_DE_PARTIDA, DESTINO.NOMBRE AS DESTINO, COORDENADAS.X AS COORDENADA_X, COORDENADAS.Y AS COORDENADA_Y, COORDENADAS.Z AS COORDENADA_Z FROM VUELOS JOIN DESTINOS AS PARTIDA ON VUELOS.ID_PUNTO_DE_PARTIDA = PARTIDA.ID_DESTINO JOIN DESTINOS AS DESTINO ON VUELOS.ID_DESTINO = DESTINO.ID_DESTINO JOIN COORDENADAS ON VUELOS.ID_VUELO = COORDENADAS.ID_VUELO WHERE VUELOS.NUMERO_DE_VUELO = ?", &numero)

	if err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusInternalServerError,
			"message":     err,
		})
	}

	defer rows.Close()

	for rows.Next() {
		if err = rows.Scan(&v.Numero, &v.Partida, &v.Destino, &v.X, &v.Y, &v.Z); err != nil {
			return c.JSON(fiber.Map{
				"success":     false,
				"status_code": http.StatusInternalServerError,
				"message":     err,
			})
		}
	}

	return c.JSON(fiber.Map{
		"success":     true,
		"status_code": http.StatusOK,
		"data":        &v,
	})
}

// Funcion para crear y obtener los vuelos disponibles de cierto punto de partida a cierto destino
func GetCiertosVuelosDisponibles(c *fiber.Ctx) error {
	var vuelos []models.VueloDisponibleCierto

	if c.IP() == "127.0.0.1" {
		log.Println("192.168.0.157")
	} else {
		log.Println(c.IP())
	}

	var partida = c.Query("partida")
	var destino = c.Query("destino")

	if err := functions.GenerarVuelosDisponibles(partida, destino); err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusInternalServerError,
			"message":     err,
		})
	}

	rows, err := database.DB.Query("SELECT VD.ID_VUELO_DISPONIBLE, DP.NOMBRE AS PUNTO_DE_PARTIDA, DD.NOMBRE AS DESTINO, VD.FECHA FROM VUELOS_DISPONIBLES VD JOIN DESTINOS DP ON VD.ID_PUNTO_DE_PARTIDA = DP.ID_DESTINO JOIN DESTINOS DD ON VD.ID_DESTINO = DD.ID_DESTINO AND VD.ID_PUNTO_DE_PARTIDA = (SELECT ID_DESTINO FROM DESTINOS WHERE NOMBRE = ?) AND VD.ID_DESTINO = (SELECT ID_DESTINO FROM DESTINOS WHERE NOMBRE = ?)", &partida, &destino)

	if err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusInternalServerError,
			"message":     err,
		})
	}

	defer rows.Close()

	for rows.Next() {
		var v = new(models.VueloDisponibleCierto)

		if err = rows.Scan(&v.Id, &v.Partida, &v.Destino, &v.Fecha); err != nil {
			return c.JSON(fiber.Map{
				"success":     false,
				"status_code": http.StatusInternalServerError,
				"message":     err,
			})
		}

		vuelos = append(vuelos, *v)
	}

	return c.JSON(fiber.Map{
		"success":     true,
		"status_code": http.StatusOK,
		"data":        &vuelos,
	})
}

// Funcion para obtener la informacion del metodo de pago de cierto cliente
func GetMetodoPago(c *fiber.Ctx) error {
	var pago = new(models.Pago)

	if c.IP() == "127.0.0.1" {
		log.Println("192.168.0.157")
	} else {
		log.Println(c.IP())
	}

	var email = c.Query("email")

	row := database.DB.QueryRow("SELECT P.ID_FORMA_DE_PAGO, C.EMAIL, P.NUMERO, P.EXPIRACION, P.CVV FROM CLIENTES C, FORMAS_DE_PAGO P WHERE P.ID_CLIENTE = C.ID_CLIENTE AND C.EMAIL = ?", &email)

	if err := row.Scan(&pago.Id, &pago.Email, &pago.Numero, &pago.Expiracion, &pago.CVV); err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusInternalServerError,
			"message":     err,
		})
	}

	return c.JSON(fiber.Map{
		"success":     true,
		"status_code": http.StatusOK,
		"data":        &pago,
	})
}

// Funcion para obtener una reservacion recien creada
func GetReservacionCreada(c *fiber.Ctx) error {
	var r = new(models.Reservacion)

	if c.IP() == "127.0.0.1" {
		log.Println("192.168.0.157")
	} else {
		log.Println(c.IP())
	}

	var email = c.Query("email")

	row := database.DB.QueryRow("SELECT R.ID_RESERVACION, C.NOMBRE AS NOMBRE_CLIENTE, C.EMAIL AS EMAIL_CLIENTE, V.NUMERO_DE_VUELO, V.FECHA, TV.NOMBRE AS TIPO_DE_VUELO, P.NOMBRE AS PARTIDA, D.NOMBRE AS DESTINO FROM RESERVACIONES R JOIN CLIENTES C ON R.ID_CLIENTE = C.ID_CLIENTE JOIN VUELOS V ON R.ID_VUELO = V.ID_VUELO JOIN TIPOS_DE_VUELO TV ON R.ID_TIPO_DE_VUELO = TV.ID_TIPO_DE_VUELO JOIN DESTINOS P ON R.ID_PUNTO_DE_PARTIDA = P.ID_DESTINO JOIN DESTINOS D ON R.ID_DESTINO = D.ID_DESTINO WHERE R.ID_CLIENTE = (SELECT ID_CLIENTE FROM CLIENTES WHERE EMAIL=?) LIMIT 1", &email)

	if err := row.Scan(&r.Id, &r.Nombre, &r.Email, &r.NumeroVuelo, &r.Fecha, &r.TipoVuelo, &r.Partida, &r.Destino); err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusInternalServerError,
			"message":     err,
		})
	}

	return c.JSON(fiber.Map{
		"success":     true,
		"status_code": http.StatusOK,
		"data":        &r,
	})
}
