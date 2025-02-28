package handlers

import (
	"net/http"
	"time"

	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/app/usecases"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/shared/responses"
	"github.com/gin-gonic/gin"
)

type HelloHandler struct {
	helloUsecase usecases.IHelloUsecase
}

func NewHelloHandler(helloUsecase *usecases.HttpHelloUsecase) *HelloHandler {
	return &HelloHandler{
		helloUsecase: helloUsecase,
	}
}

type logResponse struct {
	ID         string    `json:"id"`
	Servertime time.Time `json:"time"`
	Log        string    `json:"log"`
	Level      string    `json:"level"`
	Source     *string   `json:"source,omitempty"`
	CreatedAt  time.Time `json:"created_at"`
}

// Get godoc
// @Summary Hello
// @Description Get Hello Message
// @Tags
// @Accept       *
// @Produce      json
// @Success      200 {object} responses.DefaultResponse[[]logResponse]
// @Failure      400
// @Failure      404
// @Failure      500
// @Router       / [get]
func (h *HelloHandler) Get(c *gin.Context) {
	// Obtém os logs do usecase
	logs := h.helloUsecase.Run(c)

	// Converte de store.Log para logResponse
	var responseLogs []logResponse
	for _, log := range logs {
		var source *string
		if log.Source.Valid {
			source = &log.Source.String
		}

		responseLogs = append(responseLogs, logResponse{
			ID:         log.ID,
			Servertime: log.Servertime,
			Log:        log.Log,
			Level:      log.Level,
			Source:     source,
			CreatedAt:  log.CreatedAt,
		})
	}

	// Retorna a resposta JSON
	c.JSON(http.StatusOK, &responses.DefaultResponse[[]logResponse]{
		Message: "Logs recuperados com sucesso",
		Data:    responseLogs,
	})
}
