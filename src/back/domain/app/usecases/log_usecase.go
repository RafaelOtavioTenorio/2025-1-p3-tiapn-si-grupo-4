package usecases

import (
	"context"

	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/app/repositories"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/internal/store/store"
)

type ILogUsecase interface {
	Run(ctx context.Context) []store.Log
}

type HttpLogUsecase struct {
	LogRepository repositories.ILogRepository
}

func (h *HttpLogUsecase) Run(ctx context.Context, params store.LogParams) []store.Log {

	logs := h.LogRepository.Log(ctx, params)
	return logs
}
