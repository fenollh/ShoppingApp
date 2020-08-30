package main

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

// EditUser chages a parameter in user data
func EditUser(w http.ResponseWriter, req *http.Request) {
	var data UserDataEdition
	json.NewDecoder(req.Body).Decode(&data)
	// The payload is receibed as a string so we need to cast this value to the supported to the DB
	switch data.COLUMN {
	case "age":
		//cast to int
		break
	case "stars":
		//cast to int
		break
	default:
		//dont modify the data
		break
	}
	// update the data in the DB
	// handle all posible errors
	json.NewEncoder(w).Encode(data)
}

func main() {
	fmt.Println("Server listening in port 3002")
	db, err = sql.Open("mysql", "root:root@tcp(localhost:3306)/shoppingApp")
	if err != nil {
		panic(err.Error())
	}

	router := mux.NewRouter()

	//endpoints
	router.HandleFunc("/", EditUser).Methods("PUT")

	log.Fatal(http.ListenAndServe(":3000", router))
	defer db.Close()
}
