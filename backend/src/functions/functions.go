package functions

import (
	"fmt"
	"log"
	"math/rand"

	"github.com/fernandovmedina/proyecto-topicos/src/database"
)

// Funcion para generar un numero aleatorio entre 15000 y 20000
func GenerarNumeroAleatorio() int {
	return rand.Intn(15001) + 5000
}

// Funcion para encontrar un vuelo, sino generarlo
func FindVuelo(partida, destino string) (int, error) {
	var id int

	row := database.DB.QueryRow("SELECT ID_VUELO FROM VUELOS V, DESTINOS D WHERE V.ID_PUNTO_DE_PARTIDA = ? AND V.ID_DESTINO = ? LIMIT 1", &partida, &destino)

	if err := row.Scan(&id); err != nil {
		return 0, nil
	}

	if id == 0 {
		_, err := database.DB.Exec("INSERT INTO VUELOS(ID_AVION,ID_PUNTO_DE_PARTIDA,ID_DESTINO,FECHA)VALUES(3,?,?,?)", &partida, &destino, CrearFecha())

		if err != nil {
			return 0, nil
		}

		row = database.DB.QueryRow("SELECT COUNT(ID_VUELO) FROM VUELOS")

		if err = row.Scan(&id); err != nil {
			return 0, nil
		}
	}

	return id, nil
}

// Funcion para obtener las coordenadas de un vuelo
func GetCoordenadasVuelo(numero string) (x, y, z int) {
	rows, err := database.DB.Query("SELECT C.X, C.Y, C.Z FROM COORDENADAS C, VUELOS, AVIONES A WHERE C.ID_VUELO = VUELOS.ID_VUELO AND VUELOS.ID_AVION = A.ID_AVION AND VUELOS.NUMERO_DE_VUELO = ?", &numero)

	if err != nil {
		log.Println(err)
		return 0, 0, 0
	}

	defer rows.Close()

	for rows.Next() {
		if err = rows.Scan(&x, &y, &z); err != nil {
			log.Println(err)
			return 0, 0, 0
		}
	}

	return x, y, z
}

// Funcion para actualizar las coordenadas de un vuelo
func UpdateCoordenadasVuelo(x, y, z int, numero string) error {
	_, err := database.DB.Exec("UPDATE COORDENADAS SET X=?,Y=?,Z=? WHERE ID_VUELO=(SELECT ID_VUELO FROM VUELOS WHERE NUMERO_DE_VUELO=?);", &x, &y, &z, &numero)

	if err != nil {
		return err
	}

	return nil
}

// Funcion para crear 2 vuelos disponibles de cierto punto de partida a cierto destino
func GenerarVuelosDisponibles(partida, destino string) error {
	destinos := []string{"Saltillo", "Monterrey", "Guadalajara", "CDMX", "Cancun", "Baja California", "Mazatlan", "Queretaro"}

	var r, s int = rand.Intn(len(destinos) + 1), rand.Intn(len(destinos) + 1)

	var localPartida, localDestino = destinos[r], destinos[s]

	if localDestino == localPartida {
		localDestino = destinos[s+1]
	}

	_, err := database.DB.Exec("INSERT INTO VUELOS_DISPONIBLES(ID_AEROPUERTO,ID_PUNTO_DE_PARTIDA,ID_DESTINO,FECHA)VALUES(1,?,?,'12/04/2023')", &localPartida, &localDestino)

	if err != nil {
		return err
	}

	_, err = database.DB.Exec("INSERT INTO VUELOS_DISPONIBLES(ID_AEROPUERTO,ID_PUNTO_DE_PARTIDA,ID_DESTINO,FECHA)VALUES(1,?,?,'12/29/2023')", &localPartida, &localDestino)

	if err != nil {
		return err
	}

	return nil
}

// Funcion para obtener el id de un destino de la base de datos
func GetDestinoID(nombre string) (int, error) {
	row := database.DB.QueryRow("SELECT ID_DESTINO FROM DESTINOS WHERE NOMBRE = ?", &nombre)

	var id int

	if err := row.Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

// Funcion para crear un numero de vuelo
func CrearNumeroVuelo() string {
	return fmt.Sprintf("%d%d-%d%d%d", rand.Intn(10), rand.Intn(10), rand.Intn(10), rand.Intn(10), rand.Intn(10))
}

// Funcion para crear una ip aleatoria
func RandomIP() string {
	return fmt.Sprintf("%d%d%d.%d%d%d.%d%d%d.%d%d%d", rand.Intn(10), rand.Intn(10), rand.Intn(10), rand.Intn(10), rand.Intn(10), rand.Intn(10), rand.Intn(10), rand.Intn(10), rand.Intn(10), rand.Intn(10), rand.Intn(10), rand.Intn(10))
}

// Funcion para crear una fecha aleatoria
func CrearFecha() string {
	return fmt.Sprintf("%d/%d/2023", rand.Intn(13), rand.Intn(30))
}
