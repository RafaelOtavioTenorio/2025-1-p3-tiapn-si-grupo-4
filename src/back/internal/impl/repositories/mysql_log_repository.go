package repositories

import (
	"context"
	"time"

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
func (r *MySQLLogRepository) Log(ctx context.Context, log store.Log) (store.Log, error) {
	result, err := r.q.Log(ctx, store.LogParams{
		Servertime: time.Now(),
		Log:        "Erro de conexão",
		Level:      "error",
		Source:     "servidor-01",
	})
	if err != nil {
		return err
	}

	// Pega o ID inserido (só funciona com AUTO_INCREMENT)
	lastID, _ := result.LastInsertId()

	// Busca o registro completo
	insertedLog, err := q.GetLog(ctx, lastID)
	if err != nil {
		return err
	}

}
