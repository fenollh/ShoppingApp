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
	vars := mux.Vars(req)
	categorie := vars["categorie"]
	var data UserDataEdition
	var credentials Credentials

	json.NewDecoder(req.Body).Decode(&data)
	json.NewDecoder(req.Body).Decode(&credentials)

	auth := authenticate(credentials.USERMAIL, credentials.SESSIONID)
	if auth == false {
		json.NewEncoder(w).Encode("Error: Sorry you dont have the permissions to modify this data")
		return
	}
	if categorie == "shop" {
		UpdErr := db.QueryRow("UPDATE shops SET " + data.COLUMN + "=" + data.PAYLOAD + " WHERE email='" + credentials.USERMAIL + "';")
		if UpdErr != nil {
			fmt.Println(UpdErr)
			json.NewEncoder(w).Encode("Error: Error while updating the new data")
			return
		}

	} else {
		UpdErr := db.QueryRow("UPDATE users SET " + data.COLUMN + "=" + data.PAYLOAD + " WHERE usermail='" + credentials.USERMAIL + "';")
		if UpdErr != nil {
			fmt.Println(UpdErr)
			json.NewEncoder(w).Encode("Error: Error while updating the new data")
			return
		}
	}

	json.NewEncoder(w).Encode("Seccesfuly data edition")
}

func main() {
	fmt.Println("Server listening in port 3002")
	db, err = sql.Open("mysql", "root:root@tcp(localhost:3306)/shoppingApp")
	if err != nil {
		panic(err.Error())
	}

	router := mux.NewRouter()

	//endpoints
	router.HandleFunc("/{categorie}", EditUser).Methods("PUT")

	log.Fatal(http.ListenAndServe(":3000", router))
	defer db.Close()
}
