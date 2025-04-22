package repositories

import (
	"context"

	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/internal/store/store"
)

type MySQLLogRepository struct {
	q *store.Queries
}

func NewMysqlLogRepository(q *store.Queries) *MySQLLogRepository {
	return &MySQLLogRepository{
		q: q,
	}
}

func (r *MySQLLogRepository) GetLogs(ctx context.Context) []store.Log {
	logs, err := r.q.GetLogs(ctx)
	if err != nil {
		return []store.Log{}
	}

	return logs
}
func (r *MySQLLogRepository) Log(ctx context.Context, log store.LogParams) (store.Log, error) {
	result, err := r.q.Log(ctx, store.LogParams{
		Servertime: log.Servertime,
		Log:        log.Log,
		Level:      log.Level,
		Source:     log.Source,
		
	})
	if err != nil {
		return log, err
	}

	// Pega o ID inserido (só funciona com AUTO_INCREMENT)
	lastID, _ := result.LastInsertId()

	// Busca o registro completo
	insertedLog, err := r.q.GetLogById(ctx, string(lastID))
	if err != nil {
		return log, err
	}

	return insertedLog, nil

}
