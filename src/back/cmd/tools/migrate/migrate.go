package main

import (
	"fmt"
	"log/slog"
	"os"
	"os/exec"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		slog.Warn("Arquivo .env não encontrado, utilizando variáveis de ambiente do sistema")
	}

	cmd := exec.Command(
		"migrate",
		fmt.Sprintf("-database mysql://%s:%s@tcp(%s:%s)/%s", 
			os.Getenv("DATABASE_USER"), 
			os.Getenv("DATABASE_PASSWORD"), 
			os.Getenv("DATABASE_HOST"), 
			os.Getenv("DATABASE_PORT"), 
			os.Getenv("DATABASE_NAME")),
		" -path",
		" ./internal/store/store/migrations",
		" up",
	)
	if out, err := cmd.CombinedOutput(); err != nil {
		slog.Error("Erro ao realizar migração", "erro", string(out))
		fmt.Println(string(out))
		panic(err)
	}

}
