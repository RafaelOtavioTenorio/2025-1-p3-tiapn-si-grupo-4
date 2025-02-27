package server

import (
	"net/http"

	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/app/handlers"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/app/usecases"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/internal/impl/repositories"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type app struct {
	s *http.Server

	//handlers
	helloHandler *handlers.HelloHandler
}

func NewApp(httpServer *http.Server) *app {

	//setup repositories

	logRepository := repositories.NewMysqlLogRepository(nil)

	//seutp usecases
	helloUsecase := &usecases.HttpHelloUsecase{
		LogRepository: logRepository,
	}

	return &app{
		s: httpServer,
		helloHandler: handlers.NewHelloHandler(helloUsecase),
	}
}

func (a *app) Run(port string) error {

	router := gin.New()

	router.GET("/hello", a.helloHandler.Get)


	a.s.Addr = ":" + port
	a.s.Handler = router

	if err := a.s.ListenAndServe(); err != nil {
		logrus.Printf("%s", err.Error())
		return err
	}
	return nil
}
