package server

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/app/handlers"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/app/usecases"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/internal/impl/repositories"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/internal/store/store"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/sirupsen/logrus"
	ginlogrus "github.com/toorop/gin-logrus"
)

type App struct {
	s *http.Server
	q *store.Queries
	//handlers
	logHandler *handlers.LogsHandler
}

func NewApp(httpServer *http.Server) *App {

	user := os.Getenv("DATABASE_USER")
	pass := os.Getenv("DATABASE_PASSWORD")
	host := os.Getenv("DATABASE_HOST")
	port := os.Getenv("DATABASE_PORT")
	name := os.Getenv("DATABASE_NAME")
	connstring := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?parseTime=true",
		user,
		pass,
		host,
		port,
		name,
	)
	db, err := sql.Open("mysql", connstring)
	if err != nil {
		logrus.Error(err)
		panic(err)
	}

	if err := db.Ping(); err != nil {
		panic(err)
	}

	queries := store.New(db)

	//setup repositories
	logRepository := repositories.NewMysqlLogRepository(queries)

	//seutp usecases
	logUsecase := usecases.NewHttpLogUsecase(logRepository)

	// setup handlers
	logHandler := handlers.NewLogsHandler(logUsecase)

	return &App{
		s: httpServer,

		q:          queries,
		logHandler: logHandler,
	}
}

func (a *App) Run(port string) error {

	router := gin.New()

	router.Use(
		ginlogrus.Logger(logrus.StandardLogger()),
		gin.Recovery(),
		gin.Logger(),
	)

	//setuphandlers
	router.GET("/logs", a.logHandler.Get)
	router.POST("/logs", a.logHandler.Post)

	//setup server

	a.s.Addr = ":" + port
	a.s.Handler = router

	if err := a.s.ListenAndServe(); err != nil {
		logrus.Printf("%s", err.Error())
		return err
	}
	return nil
}
