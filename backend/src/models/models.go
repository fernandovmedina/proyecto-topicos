package models

type VueloDisponible struct {
	Id      int    `json:"id"`
	Partida string `json:"punto_de_partida"`
	Destino string `json:"destino"`
	Fecha   string `json:"fecha"`
  Numero  string `json:"numero"`
}

type VueloCliente struct {
	Numero  string `json:"numero_vuelo"`
	Partida string `json:"partida"`
	Destino string `json:"destino"`
}

type Coordenada struct {
	Id int `json:"id"`
	X  int `json:"x"`
	Y  int `json:"y"`
	Z  int `json:"z"`
}

type VueloRastreo struct {
	Numero  string `json:"numero_vuelo"`
	Partida string `json:"partida"`
	Destino string `json:"destino"`
	X       int    `json:"x"`
	Y       int    `json:"y"`
	Z       int    `json:"z"`
}

type Cliente struct {
	Id       int    `json:"id"`
	Nombre   string `json:"nombre"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Reservacion struct {
	Id          int    `json:"id"`
	Nombre      string `json:"nombre"`
	Email       string `json:"email"`
	NumeroVuelo string `json:"numero_vuelo"`
	Fecha       string `json:"fecha"`
	TipoVuelo   string `json:"tipo_vuelo"`
	Partida     string `json:"partida"`
	Destino     string `json:"destino"`
}

type VueloDisponibleCierto struct {
	Id      int    `json:"id"`
	Partida string `json:"partida"`
	Destino string `json:"destino"`
	Fecha   string `json:"fecha"`
}

type Pago struct {
	Id         int    `json:"id"`
	Email      string `json:"email"`
	Numero     string `json:"numero"`
	Expiracion string `json:"expiracion"`
	CVV        string `json:"cvv"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RegisterRequest struct {
	Nombre   string `json:"nombre"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
