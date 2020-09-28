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
		w.WriteHeader(http.StatusBadGateway)
		json.NewEncoder(w).Encode("Error code 502: Error while selecting data")
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)
	return
}

// GetPublicShop selects all the shop's data. Authentication is required
func GetPublicShop(w http.ResponseWriter, req *http.Request) {
	//vars := mux.Vars(req)
	//criteria := vars["criteria"]
	var shopsList []ShopData

	rows, SelErr := db.Query("SELECT username, usermail, name, location, schedule, details, stars, description, image, tags, categories, stock, shopType FROM shops LIMIT 2;")
	if SelErr != nil {
		fmt.Println("Error while selecting")
		json.NewEncoder(w).Encode("Error while selecting")
		return
	}
	for rows.Next() {
		var shop ShopData
		ScanErr := rows.Scan(&shop.USERNAME, &shop.USERMAIL, &shop.NAME, &shop.LOCATION, &shop.SCHEDULE, &shop.DETAILS, &shop.STARS, &shop.DESCRIPTION, &shop.IMAGE, &shop.TAGS, &shop.CATEGORIES, &shop.STOCK, &shop.SHOPTYPE)
		if ScanErr != nil {
			fmt.Println(ScanErr)
			json.NewEncoder(w).Encode("Error while scaning")
			return
		}
		shopsList = append(shopsList, shop)
	}
	fmt.Println(shopsList)
	json.NewEncoder(w).Encode(shopsList)
	/*
		1- leo en los parametros cuantos registros quiere (x)
		2- ordeno la tabla de la manera pertinente (mas adelante)
		3- devuelvo los x primeros registros (SELECT * FROM table WHERE condition LIMIT x;)
	*/
}

// GetPrivateUser selects all the user's data. Authentication is required
func GetPrivateUser(w http.ResponseWriter, req *http.Request) {
	var credentials Credentials
	var data PrivateUserData
	_ = json.NewDecoder(req.Body).Decode(&credentials)
	auth := authenticate(credentials.USERMAIL, credentials.SESSIONID)
	if auth == false {
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode("Error code 403: Error while authenticating. This data is private")
		return
	}

	SelErr := db.QueryRow("SELECT usermail, username, name, age, shoppingList, favShopsList, description, image, stars FROM users WHERE usermail=?", credentials.USERMAIL).Scan(&data.USERMAIL, &data.USERNAME, &data.NAME, &data.AGE, &data.SHOPPINGLIST, &data.FAVSHOPSLIST, &data.DESCRIPTION, &data.IMAGE, &data.STARS)
	if SelErr != nil {
		fmt.Println(SelErr)
		w.WriteHeader(http.StatusBadGateway)
		json.NewEncoder(w).Encode("Error code 502: Error while selecting data")
		return
	}
	//fmt.Println(data)
	data.ACCOUNTTYPE = "Costumer"
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)
	return
}

// GetPrivateShop selects all the shop's data. Authentication is required
func GetPrivateShop(w http.ResponseWriter, req *http.Request) {
	var credentials Credentials
	var data ShopData
	_ = json.NewDecoder(req.Body).Decode(&credentials)
	auth := authenticate(credentials.USERMAIL, credentials.SESSIONID)
	if auth == false {
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode("Error code 403: Error while authenticating. This data is private")
		return
	}
	SelErr := db.QueryRow("SELECT username, usermail, name, location, schedule, details, stars, description, image, tags, categories, stock, shopType FROM shops WHERE usermail=?", credentials.USERMAIL).Scan(&data.USERNAME, &data.USERMAIL, &data.NAME, &data.LOCATION, &data.SCHEDULE, &data.DETAILS, &data.STARS, &data.DESCRIPTION, &data.IMAGE, &data.TAGS, &data.CATEGORIES, &data.STOCK, &data.SHOPTYPE)
	if SelErr != nil {
		fmt.Println(SelErr)
		w.WriteHeader(http.StatusBadGateway)
		json.NewEncoder(w).Encode("Error code 502: Error while selecting data")
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)
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
	router.HandleFunc("/getPublicShop/{criteria}", GetPublicShop).Methods("GET")
	router.HandleFunc("/getPrivateShop", GetPrivateShop).Methods("POST")

	log.Fatal(http.ListenAndServe(":3000", router))
	defer db.Close()
}
