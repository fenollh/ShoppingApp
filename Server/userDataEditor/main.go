package main

func main() {

}

/*

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

var db *sql.DB
var err error

// GetPublicUser selects all  the ppublic data about a user without authentication
func GetPublicUser(w http.ResponseWriter, req *http.Request) {
}

func main() {
	fmt.Println("Server listening in port 3002")
	db, err = sql.Open("mysql", "root:root@tcp(localhost:3306)/shoppingApp")
	if err != nil {
		panic(err.Error())
	}

	router := mux.NewRouter()

	//endpoints
	router.HandleFunc("/", GetPublicUser).Methods("POST")

	log.Fatal(http.ListenAndServe(":3000", router))
	defer db.Close()
}
*/
