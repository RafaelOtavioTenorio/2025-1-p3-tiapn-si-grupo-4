package repositories

type ILogRepository interface {
	GetLogs() []byte
}
