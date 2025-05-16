package usecases

import (
	"context"
	"fmt"

	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/app/repositories"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/internal/store/store"
)

type ILogUsecase interface {
	Run(ctx context.Context, params store.LogParams) (store.Log, error)
}

type HttpLogUsecase struct {
	LogRepository repositories.ILogRepository
}

func NewHttpLogUsecase(logRepository repositories.ILogRepository) *HttpHelloUsecase {
	return &HttpHelloUsecase{
		LogRepository: logRepository,
	}
}

func (h *HttpLogUsecase) Run(ctx context.Context, params store.LogParams) (store.Log, error) {

	log, err := h.LogRepository.Log(ctx, params)
	if err != nil {
		return store.Log{}, fmt.Errorf("Erro in log: %+w", err)
	}
	return log, nil
}

var _ ILogUsecase = &HttpLogUsecase{}


//cannot use logUsecase (variable of type *usecases.HttpHelloUsecase) as *usecases.ILogUsecase value in argument to handlers.NewLogHandler: *usecases.HttpHelloUsecase does not implement *usecases.ILogUsecase (type *usecases.ILogUsecase is pointer to interface, not interface)