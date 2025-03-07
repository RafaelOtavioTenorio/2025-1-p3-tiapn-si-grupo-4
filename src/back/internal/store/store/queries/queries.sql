-- name: GetLogs :many

select * from logs;

-- name: Log :one 

insert into logs (id, servertime, log, level, source ) values ($1, $2, $3, $4, $5) returning *;
