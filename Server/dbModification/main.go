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

// GetPublicUser selects all  the ppublic data about a user without authentication
func GetPublicUser(w http.ResponseWriter, req *http.Request) {
	var usermail string
	var data PublicUserData
	_ = json.NewDecoder(req.Body).Decode(&usermail)
	SelErr := db.QueryRow("SELECT username, name, description, image, stars FROM users WHERE usermail=?", usermail).Scan(&data.USERNAME, &data.NAME, &data.DESCRIPTION, &data.IMAGE, &data.STARS)
	if SelErr != nil {
		fmt.Println(SelErr)
		json.NewEncoder(w).Encode("Error: Error while selecting data")
		return
	}
	json.NewEncoder(w).Encode(data)
	return
}

// GetPrivateUser selects all the user's data. Authentication is required
func GetPrivateUser(w http.ResponseWriter, req *http.Request) {
	var credentials Credentials
	var data PrivateUserData
	_ = json.NewDecoder(req.Body).Decode(&credentials)
	auth := authenticate(credentials.USERMAIL, credentials.SESSIONID)
	if auth == false {
		json.NewEncoder(w).Encode("Error: Error while authenticating. This data is private")
		return
	}

	SelErr := db.QueryRow("SELECT usermail, username, name, age, shoppingList, favShopsList, decription, image, stars FROM users WHERE usermail=?", credentials.USERMAIL).Scan(&data.USERMAIL, &data.USERNAME, &data.NAME, &data.AGE, &data.SHOPPINGLIST, &data.FAVSHOPSLIST, &data.DESCRIPTION, &data.IMAGE, &data.STARS)
	if SelErr != nil {
		fmt.Println(SelErr)
		fmt.Println("Error: Error while selecting data")
		json.NewEncoder(w).Encode("Error: Error while selecting data")
		return
	}
	//fmt.Println(data)
	fmt.Println("data")
	json.NewEncoder(w).Encode("data")

	return
}

func main() {
	fmt.Println("Server listening in port 3000")
	db, err = sql.Open("mysql", "root:root@tcp(localhost:3306)/shoppingApp")
	if err != nil {
		panic(err.Error())
	}

	router := mux.NewRouter()

	//endpoints
	router.HandleFunc("/getPublicUser", GetPublicUser).Methods("POST")
	router.HandleFunc("/getPrivateUser", GetPrivateUser).Methods("POST")

	log.Fatal(http.ListenAndServe(":3000", router))
	defer db.Close()
}
