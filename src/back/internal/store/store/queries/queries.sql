-- name: GetLogs :many
select * from logs;

-- name: Log :execresult
INSERT INTO logs (
  id,
  servertime,
  log,
  `level`,
  source
) VALUES (
  ?, ?, ?, ?, ?
);

-- name 