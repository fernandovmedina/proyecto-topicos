package config

import (
	"github.com/fernandovmedina/proyecto-topicos/src/handlers"
	"github.com/gofiber/fiber/v2"
)

// Funcion para inicializar los handlers del server
func InitHandlers(s *fiber.App) {
	s.Get("/api", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"success":     true,
			"status_code": fiber.StatusOK,
			"ip":          c.IP(),
		})
	})
	s.Get("/api/vuelos_disponibles", handlers.GetVuelosDisponibles)
	s.Get("/api/vuelos_cliente", handlers.GetVuelosCliente)
	s.Get("/api/rastrear_vuelo", handlers.RastrearVuelo)
	s.Get("/api/coordenadas_vuelo", handlers.GetCoordenadas)
	s.Get("/api/vuelos_ciertos", handlers.GetCiertosVuelosDisponibles)
	s.Get("/api/pago", handlers.GetMetodoPago)
	s.Get("/api/new_reservacion", handlers.GetReservacionCreada)

	s.Post("/api/register", handlers.Register)
	s.Post("/api/login", handlers.Login)
	s.Post("/api/reservacion", handlers.Reservacion)
	s.Post("/api/new_pago", handlers.PostPago)
}
