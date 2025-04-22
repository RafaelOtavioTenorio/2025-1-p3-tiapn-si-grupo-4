package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/app/usecases"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/shared/responses"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/internal/store/store"
	"github.com/gin-gonic/gin"
)

type LogsHandler struct {
	getLogsUsecase   usecases.IGetLogsUsecase
	createLogUsecase usecases.ILogUsecase
}

func NewLogsHandler(log usecases.IGetLogsUsecase) *LogsHandler {
	return &LogsHandler{
		getLogsUsecase: log,
	}
}

type getlogResponse struct {
	ID         string    `json:"id"`
	Servertime time.Time `json:"time"`
	Log        string    `json:"log"`
	Level      string    `json:"level"`
	Source     *string   `json:"source,omitempty"`
	CreatedAt  time.Time `json:"created_at"`
}

// Get godoc
// @Summary LogHandler
// @Description Handle Log to Database
// @Tags
// @Accept       *
// @Produce      json
// @Success      200 {object} responses.DefaultResponse[[]logResponse]
// @Failure      400
// @Failure      404
// @Failure      500
// @Router       /logs [get]
func (h *LogsHandler) Get(c *gin.Context) {
	// Obtém os logs do usecase

	logs := h.getLogsUsecase.Run(c)

	// Converte de store.Log para logResponse
	var responseLogs []getlogResponse
	for _, log := range logs {
		var source *string
		if log.Source.Valid {
			source = &log.Source.String
		}

		responseLogs = append(responseLogs, getlogResponse{
			ID:         log.ID,
			Servertime: log.Servertime,
			Log:        log.Log,
			Level:      log.Level,
			Source:     source,
			CreatedAt:  log.CreatedAt,
		})
	}

	// Retorna a resposta JSON
	c.JSON(http.StatusOK, &responses.DefaultResponse[[]getlogResponse]{
		Message: "Logs recuperados com sucesso!",
		Data:    responseLogs,
	})
}

type createlogRequest struct {
	Log       string    `json:"log"`
	Level     string    `json:"level"`
	CreatedAt time.Time `json:"created_at"`
	Source    *string   `json:"source,omitempty"`
}

// Get godoc
// @Summary LogHandler
// @Description Handle Log creation to Database
// @Tags
// @Accept       *
// @Produce      json
// @Success      200 {object} responses.DefaultResponse[logResponse]
// @Failure      400
// @Failure      404
// @Failure      500
// @Router       /logs [post]
func (h *LogsHandler) Post(c *gin.Context) {

	var body createlogRequest
	if err := json.NewDecoder(c.Request.Body).Decode(&body); err != nil {
		c.JSON(http.StatusBadRequest, &responses.DefaultResponse[any]{
			Message: "Erro ao criar log",
		})
		return
	}

	source := sql.NullString{
		String: *body.Source,
	}

	newLog := store.LogParams{
		Servertime: time.Now(),
		Log:        body.Log,
		Level:      body.Level,
		Source:     source,
	}

	log, err := h.createLogUsecase.Run(c.Request.Context(), newLog)
	if err != nil {
		c.JSON(http.StatusInternalServerError, &responses.DefaultResponse[any]{
			Message: "Erro ao criar log",
		})
		return
	}

	c.JSON(http.StatusCreated, getlogResponse{
		ID:         log.ID,
		Servertime: log.Servertime,
		Log:        log.Log,
		Level:      log.Level,
		Source:     &log.Source.String,
		CreatedAt:  log.CreatedAt,
	})
}
