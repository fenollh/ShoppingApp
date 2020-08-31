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

//CreateUser receive the user json object and upload it to the DB
func CreateUser(w http.ResponseWriter, req *http.Request) {
	var user User
	_ = json.NewDecoder(req.Body).Decode(&user)
	userAvailable := CheckUsermail("user", user.USERMAIL)
	if userAvailable == false {
		w.WriteHeader(http.StatusConflict)
		json.NewEncoder(w).Encode("Error ode 409: This email has already been used")
		return
	}
	var data string = "('" + user.USERMAIL + "', '" + user.USERNAME + "', '" + user.NAME + "', " + user.AGE + ", '', '', '', '" + user.IMAGE + "', 5, '" + user.PASSWORD + "');"
	_, InsErr := db.Query("INSERT INTO users (usermail, username, name, age, shoppingList, favShopsList, decription, image, stars, password) VALUES " + data)
	if InsErr != nil {
		fmt.Println(InsErr)
		w.WriteHeader(http.StatusBadGateway)
		json.NewEncoder(w).Encode("Error code 502: Error while inserting data")
		return
	}
	var sesID = HandleSession(user.USERMAIL)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(sesID)
	return
}

//CreateShop receive the user json object and upload it to the DB
func CreateShop(w http.ResponseWriter, req *http.Request) {
	var shop Shop
	_ = json.NewDecoder(req.Body).Decode(&shop)
	userAvailable := CheckUsermail("shop", shop.SHOPMAIL)
	if userAvailable == false {
		w.WriteHeader(http.StatusConflict)
		json.NewEncoder(w).Encode("Error code 409: This email has already been used")
		return
	}
	var data string = "('" + shop.SHOPNAME + "', '" + shop.SHOPMAIL + "', '" + shop.MANAGERNAME + "', '', '', '', 5, '', " + "'" + shop.IMAGE + "', '', '', '', '" + shop.SHOPTYPE + "', '" + shop.PASSWORD + "');"
	_, InsErr := db.Query("INSERT INTO shops (name, email, managerName, location, schedule, details, stars, description, image, tags, categories, stock, shopType, password) VALUES " + data)
	if InsErr != nil {
		fmt.Println(InsErr)
		w.WriteHeader(http.StatusBadGateway)
		json.NewEncoder(w).Encode("Error code 502: Error while inserting data")
		return
	}
	var sesID = HandleSession(shop.SHOPMAIL)
	json.NewEncoder(w).Encode(sesID)
	return
}

//Login g
func Login(w http.ResponseWriter, req *http.Request) {
	var user User
	var expectedPasswordUsr string
	var expectedPasswordShp string
	_ = json.NewDecoder(req.Body).Decode(&user)
	SeUsrErr := db.QueryRow("SELECT password FROM users WHERE usermail='" + user.USERMAIL + "';").Scan(&expectedPasswordUsr)
	SeShpErr := db.QueryRow("SELECT password FROM shops WHERE email='" + user.USERMAIL + "';").Scan(&expectedPasswordShp)
	if SeUsrErr != nil && SeShpErr != nil {
		fmt.Println(SeUsrErr)
		fmt.Println(SeShpErr)
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode("Error code 404: User  doesn't exists")
		return
	}
	if expectedPasswordUsr != user.PASSWORD && expectedPasswordShp != user.PASSWORD {
		fmt.Println("Error: usermail and password don't match")
		w.WriteHeader(http.StatusNotAcceptable)
		json.NewEncoder(w).Encode("Error code 406: usermail and password don't match")
		return
	}
	var sesID = HandleSession(user.USERMAIL)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(sesID)
	return
}

func main() {
	fmt.Println("Server listening in port 3001")
	db, err = sql.Open("mysql", "root:root@tcp(localhost:3306)/shoppingApp")
	if err != nil {
		panic(err.Error())
	}

	router := mux.NewRouter()

	//endpoints
	router.HandleFunc("/newuser", CreateUser).Methods("POST")
	router.HandleFunc("/newshop", CreateShop).Methods("POST")
	router.HandleFunc("/login", Login).Methods("POST")

	log.Fatal(http.ListenAndServe(":3001", router))
	defer db.Close()
}
