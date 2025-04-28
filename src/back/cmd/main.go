package main

import (
	"fmt"
	"net/http"
	"github.com/joho/godotenv"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/internal/server"
)

func main() {

	godotenv.Load(".env")

	srv := http.Server{
		Addr: "127.0.0.1",
	}

	app := server.NewApp(&srv)

	if err := app.Run("8001"); err != nil {
		fmt.Println(err)
	}
}
