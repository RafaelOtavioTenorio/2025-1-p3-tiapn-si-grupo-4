package responses

// A Default Generic Response
// Message returns a string with a message from backend, could be error or success message responses
// Data returns a generic List of data, usually to return a list of requested objects from backend
type DefaultResponse[T any] struct {
	Message string `json:"message"`
	Data    T      `json:"data"`
}
