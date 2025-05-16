-- name: GetLogs :many
select * from logs;

-- name: Log :execresult
INSERT INTO logs (
  servertime,
  log,
  `level`,
  source
) VALUES (
  ?, ?, ?, ?, ?
);

-- name: GetLogById :one
select * from logs where id = ?;