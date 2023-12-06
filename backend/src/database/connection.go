package database

import (
  "log"
	"database/sql"
	"os"

	"github.com/joho/godotenv"

	_ "github.com/go-sql-driver/mysql"
)

// Variable que almacenara la conexion a la base de datos
var DB *sql.DB

// Funcion para conectarse a la base de datos
func ConnectDB() (*sql.DB, error) {
	var err error

	if err = godotenv.Load(".env"); err != nil {
		return nil, err
	}

	var (
		databaseName string = os.Getenv("DATABASE_NAME")
		databasePass string = os.Getenv("DATABASE_PASS")
		databaseUser string = os.Getenv("DATABASE_USER")
		databaseHost string = os.Getenv("DATABASE_HOST")
		databasePort string = os.Getenv("DATABASE_PORT")
	)

	var dsn string = databaseUser + ":" + databasePass + "@tcp(" + databaseHost + ":" + databasePort + ")/" + databaseName

	if DB, err = sql.Open("mysql", dsn); err != nil {
		return nil, err
	} else {
		if err = DB.Ping(); err != nil {
			return nil, err
		} else {
			log.Println("Conexion exitosa a la base de datos")
      return DB, nil
		}
	}
}
