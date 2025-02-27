package repositories

import (
	"database/sql"

	"github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/app/repositories"
)

type MySQLLogRepository struct {
	db *sql.DB
}

// Log implements repositories.ILogRepository.
func (r *MySQLLogRepository) Log(log string) {

}

func NewMysqlLogRepository(db *sql.DB) *MySQLLogRepository {
	return &MySQLLogRepository{
		db: db,
	}
}

func (r *MySQLLogRepository) GetLogs() []byte {
	return []byte("hello world air rebuild")
}

var _ repositories.ILogRepository = &MySQLLogRepository{}
