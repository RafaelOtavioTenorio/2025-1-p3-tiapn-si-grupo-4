package usecases

import "github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/domain/app/repositories"

type IHelloUsecase interface {
	Run() string
}

type HttpHelloUsecase struct {
	LogRepository repositories.ILogRepository
}

func (h *HttpHelloUsecase) Run() string {
	stringHello := string(h.LogRepository.GetLogs())
	return stringHello
}
