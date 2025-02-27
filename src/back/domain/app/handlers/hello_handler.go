package handlers

import (
	"net/http"

	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/app/usecases"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/shared/responses"
	"github.com/gin-gonic/gin"
)

type HelloHandler struct {
	heloUsecase usecases.IHelloUsecase
}

func NewHelloHandler(helloUsecase *usecases.HttpHelloUsecase) *HelloHandler {
	return &HelloHandler{
		heloUsecase: helloUsecase,
	}
}

// / Get godoc
// / @Sumary Hello
// @Description  Get Hello Message
// @Tags
// @Accept       *
// @Produce      text
// @Param 		 *
// @Success      200
// @Failure      400
// @Failure      404
// @Failure      500
// @Router       / [get]
func (h *HelloHandler) Get(c *gin.Context) {

	message := h.heloUsecase.Run()

	c.JSON(http.StatusOK, &responses.DefaultResponse[string]{
		Message: message,
		Data:    message,
	})

	return
}
