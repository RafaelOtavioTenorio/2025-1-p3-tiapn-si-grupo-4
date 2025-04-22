package usecases

import (
	"context"

	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/app/repositories"
	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/internal/store/store"
)

type IGetLogsUsecase interface {
	Run(ctx context.Context) []store.Log
}

type GetLogsUsecase struct {
	logsRepository repositories.ILogRepository
}

func (g *GetLogsUsecase) Run(ctx context.Context) []store.Log {

	logs := g.logsRepository.GetLogs(ctx)

	return logs

}
