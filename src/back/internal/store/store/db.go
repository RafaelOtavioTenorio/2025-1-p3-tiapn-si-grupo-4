package store

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func OpenConnection() (*sql.DB, error) {
	conn, err := sql.Open("mysql", "host=localhost port=3066 user=user password=123456789 dbname=melitus sslmode=disable")
	if err != nil {
		panic(err)
	}

	err = conn.Ping()
	if err != nil {
		panic(err)
	}

	return conn, err
}
