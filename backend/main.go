package main

import (
	"log"
	"os"

	"github.com/fernandovmedina/proyecto-topicos/src/config"
	"github.com/fernandovmedina/proyecto-topicos/src/database"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	var err error
  
  go func() {
	  if _, err = database.ConnectDB(); err != nil {
		  log.Println(err.Error())
	  }
  }()

	if err = godotenv.Load(".env"); err != nil {
		log.Println(err.Error())
	}

	var (
		serverName string = os.Getenv("SERVER_NAME")
		serverPort string = os.Getenv("SERVER_PORT")
	)

	var server = fiber.New(fiber.Config{
		AppName: serverName,
	})

	server.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowMethods:     "GET, POST, PUT, DELETE",
		AllowHeaders:     "Origin, Content-Type, Accept",
		ExposeHeaders:    "Authorization",
		AllowCredentials: true,
		MaxAge:           3600,
	}))

	server.Options("/*", func(c *fiber.Ctx) error {
		return c.SendStatus(fiber.StatusNoContent)
	})

	config.InitHandlers(server)

	if err = server.Listen(serverPort); err != nil {
		log.Println(err.Error())
	}
}
