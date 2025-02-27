package repositories

import "database/sql"

type MySQLLogRepository struct {
	db *sql.DB
}

func NewMysqlLogRepository(db *sql.DB) *MySQLLogRepository {
	return &MySQLLogRepository{
		db: db,
	}
}

func (r *MySQLLogRepository) GetLogs() []byte {
	return []byte("hello world")
}
