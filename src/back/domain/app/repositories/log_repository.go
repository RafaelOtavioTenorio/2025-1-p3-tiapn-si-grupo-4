package repositories

type ILogRepository interface {
	GetLogs() []byte
	Log(log string)
}
