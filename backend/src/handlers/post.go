package handlers

import (
	"log"
	"math/rand"
	"net/http"

	"github.com/fernandovmedina/proyecto-topicos/src/database"
	"github.com/fernandovmedina/proyecto-topicos/src/functions"
	"github.com/fernandovmedina/proyecto-topicos/src/models"

	"github.com/gofiber/fiber/v2"
)

// Funcion para registrar un nuevo cliente en la base de datos
func Register(c *fiber.Ctx) error {
	var request = new(models.RegisterRequest)

	if c.IP() == "127.0.0.1" {
		log.Println("192.168.0.157")
	} else {
		log.Println(c.IP())
	}

	if err := c.BodyParser(&request); err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusBadRequest,
			"message":     err,
		})
	}

	_, err := database.DB.Exec("INSERT INTO CLIENTES(ID_AEROPUERTO,NOMBRE,EMAIL,PASS)VALUES(1,?,?,?)", &request.Nombre, &request.Email, &request.Password)

	if err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusInternalServerError,
			"message":     err,
		})
	}

	rows, err := database.DB.Query("SELECT ID_CLIENTE,NOMBRE,EMAIL,PASS FROM CLIENTES WHERE EMAIL=?", &request.Email)

	if err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusConflict,
			"message":     err,
		})
	}

	defer rows.Close()

	var cliente = new(models.Cliente)

	for rows.Next() {
		if err = rows.Scan(&cliente.Id, &cliente.Nombre, &cliente.Email, &cliente.Password); err != nil {
			return c.JSON(fiber.Map{
				"success":     false,
				"status_code": http.StatusNotAcceptable,
				"message":     err,
			})
		}
	}

	return c.JSON(fiber.Map{
		"success":     true,
		"status_code": http.StatusCreated,
		"data":        &cliente,
	})
}

// Funcion para hacer login de un cliente
func Login(c *fiber.Ctx) error {
	var request = new(models.LoginRequest)

	if c.IP() == "127.0.0.1" {
		log.Println("192.168.0.157")
	} else {
		log.Println(c.IP())
	}

	if err := c.BodyParser(&request); err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusBadRequest,
			"message":     err,
		})
	}

	var cliente = new(models.Cliente)

	rows, err := database.DB.Query("SELECT ID_CLIENTE,NOMBRE,EMAIL,PASS FROM CLIENTES WHERE EMAIL = ? AND PASS = ?", &request.Email, &request.Password)

	if err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusInternalServerError,
			"message":     err,
		})
	}

	defer rows.Close()

	for rows.Next() {
		if err = rows.Scan(&cliente.Id, &cliente.Nombre, &cliente.Email, &cliente.Password); err != nil {
			return c.JSON(fiber.Map{
				"success":     false,
				"status_code": http.StatusInternalServerError,
				"message":     err,
			})
		}
	}

	if cliente.Nombre == "" && cliente.Id == 0 {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusNotFound,
			"message":     "user not found",
		})
	}

	return c.JSON(fiber.Map{
		"success":     true,
		"status_code": http.StatusOK,
		"data":        &cliente,
	})
}

// Query para obtener la informacion de una reservacion
// SELECT R.ID_RESERVACION, C.NOMBRE AS NOMBRE_CLIENTE, C.EMAIL AS EMAIL_CLIENTE, V.NUMERO_DE_VUELO, V.FECHA, TV.NOMBRE AS TIPO_DE_VUELO, P.NOMBRE AS PARTIDA, D.NOMBRE AS DESTINO FROM RESERVACIONES R JOIN CLIENTES C ON R.ID_CLIENTE = C.ID_CLIENTE JOIN VUELOS V ON R.ID_VUELO = V.ID_VUELO JOIN TIPOS_DE_VUELO TV ON R.ID_TIPO_DE_VUELO = TV.ID_TIPO_DE_VUELO JOIN DESTINOS P ON R.ID_PUNTO_DE_PARTIDA = P.ID_DESTINO JOIN DESTINOS D ON R.ID_DESTINO = D.ID_DESTINO

// Funcion para hacer una reservacion
func Reservacion(c *fiber.Ctx) error {
	var avion = rand.Intn(6)
	var fecha = functions.CrearFecha()
	var numero = functions.CrearNumeroVuelo()

	if c.IP() == "127.0.0.1" {
		log.Println("192.168.0.157")
	} else {
		log.Println(c.IP())
	}

	var partida = c.Query("partida")
	var destino = c.Query("destino")
	var email = c.Query("email")
	var tipo = c.Query("tipo")

	var idTipo int

	if tipo == "redondo" {
		idTipo = 1
	} else if tipo == "normal" {
		idTipo = 2
	} else {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusBadRequest,
			"message":     "wrong type",
		})
	}

	_, err := database.DB.Exec("INSERT INTO VUELOS(NUMERO_DE_VUELO,ID_AVION,ID_PUNTO_DE_PARTIDA,ID_DESTINO,FECHA)VALUES(?,?,?,?,?)", &numero, &avion, &partida, &destino, &fecha)

	if err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusInternalServerError,
			"message":     err,
		})
	}

	/*
		idVuelo, err := functions.FindVuelo(partida, destino)

		if err != nil {
			return c.JSON(fiber.Map{
				"success":     false,
				"status_code": http.StatusInternalServerError,
				"message":     err,
			})
		}
	*/

	_, err = database.DB.Exec("INSERT INTO RESERVACIONES(ID_CLIENTE,ID_VUELO,ID_TIPO_DE_VUELO,ID_PUNTO_DE_PARTIDA,ID_DESTINO)VALUES((SELECT ID_CLIENTE FROM CLIENTES WHERE EMAIL = ?),(SELECT ID_VUELO FROM VUELOS WHERE NUMERO_DE_VUELO=?),?,?,?)", &email, &numero, &idTipo, &partida, &destino)

	if err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusInternalServerError,
			"message":     err,
		})
	}

	_, err = database.DB.Exec("INSERT INTO CLIENTE_has_VUELOS(ID_CLIENTE,ID_VUELO)VALUES((SELECT ID_CLIENTE FROM CLIENTES WHERE EMAIL=?),(SELECT COUNT(ID_VUELO) FROM VUELOS))", &email)

	if err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusInternalServerError,
			"message":     err,
		})
	}

	return c.JSON(fiber.Map{
		"success":     true,
		"status_code": http.StatusCreated,
	})
}

// Funcion para insertar un nuevo pago a la base de datos
func PostPago(c *fiber.Ctx) error {
	var email = c.Query("email")

	if c.IP() == "127.0.0.1" {
		log.Println("192.168.0.157")
	} else {
		log.Println(c.IP())
	}

	var numero = c.Query("numero")
	var expiracion = c.Query("expiracion")
	var cvv = c.Query("cvv")

	_, err := database.DB.Exec("INSERT INTO FORMAS_DE_PAGO(ID_CLIENTE,NUMERO,EXPIRACION,CVV)VALUES((SELECT ID_CLIENTE FROM CLIENTES WHERE EMAIL = ?),?,?,?)", &email, &numero, &expiracion, &cvv)

	if err != nil {
		return c.JSON(fiber.Map{
			"success":     false,
			"status_code": http.StatusInternalServerError,
			"message":     err,
		})
	}

	return c.JSON(fiber.Map{
		"success":     true,
		"status_code": http.StatusCreated,
	})
}
