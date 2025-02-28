package usecases

import (
	"context"

	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/app/repositories"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/internal/store/store"
)

type IHelloUsecase interface {
	Run(ctx context.Context) []store.Log
}

type HttpHelloUsecase struct {
	LogRepository repositories.ILogRepository
}

func (h *HttpHelloUsecase) Run(ctx context.Context) []store.Log {
	logs := h.LogRepository.GetLogs(ctx)
	return logs
}
