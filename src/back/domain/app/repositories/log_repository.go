package repositories

import (
	"context"

	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/internal/store/store"
)

type ILogRepository interface {
	GetLogs(ctx context.Context) []store.Log
	Log(ctx context.Context, log store.LogParams) (store.Log, error)
}
