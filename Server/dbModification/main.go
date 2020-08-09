package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var db *sql.DB
var err error

//Credentials the data needed for authentication
type Credentials struct {
	SESSIONID string `json:"sessionID"`
	USERMAIL  string `json:"usermail"`
}

//ShopData all the data from a shop is public except for the password
type ShopData struct {
	SHOPNAME    string `json:"name"`
	SHOPMAIL    string `json:"email"`
	MANAGERNAME string `json:"managerName"`
	LOCATION    string `json:"location"`
	SCHEDULE    string `json:"schedule"`
	DETAILS     string `json:"details"`
	STARS       int    `json:"stars"`
	DESCRIPTION string `json:"description"`
	IMAGE       string `json:"image"`
	TAGS        string `json:"tags"`
	CATEGORIES  string `json:"categories"`
	STOCK       string `json:"stock"`
	SHOPTYPE    string `json:"shopType"`
}

//PublicUserData the user data that doesn't need authentication to be accesed
type PublicUserData struct {
	USERNAME    string `json:"username"`
	NAME        string `json:"name"`
	DESCRIPTION string `json:"description"`
	IMAGE       string `json:"image"`
	STARS       int    `json:"stars"`
}

//PrivateUserData the user data that needs authentication to be accesed
type PrivateUserData struct {
	USERMAIL     string `json:"usermail"`
	AGE          int    `json:"age"`
	SHOPPINGLIST string `json:"shoppingList"`
	FAVSHOPSLIST string `json:"favShopsList"`

	USERNAME    string `json:"username"`
	NAME        string `json:"name"`
	DESCRIPTION string `json:"description"`
	IMAGE       string `json:"image"`
	STARS       int    `json:"stars"`
}

// GetPublicUser selects all  the ppublic data about a user without authentication
func GetPublicUser(w http.ResponseWriter, req *http.Request) {
	json.NewEncoder(w).Encode("hola")
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
	}
	SelErr := db.QueryRow("SELECT usermail, username, name, age, shoppingList, favShopsList, description, image, stars FROM users WHERE usermail=?", credentials.USERMAIL).Scan(&data.USERMAIL, &data.USERNAME, &data.NAME, &data.AGE, &data.SHOPPINGLIST, &data.FAVSHOPSLIST, &data.DESCRIPTION, &data.IMAGE, &data.STARS)
	if SelErr != nil {
		fmt.Println(SelErr)
		json.NewEncoder(w).Encode("Error: Error while selecting data")
	}
	json.NewEncoder(w).Encode(data)
	return
}

func authenticate(usermail string, sessionID string) bool {
	var expectedSessionID string
	SeSesErr := db.QueryRow("SELECT sessionID FROM sessions WHERE usermail=?", usermail).Scan(&expectedSessionID)
	if SeSesErr != nil {
		fmt.Println(SeSesErr)
		return false
	}
	if sessionID != expectedSessionID {
		return false
	}
	return true
}
func main() {
	fmt.Println("Server listening in port 3000")
	db, err = sql.Open("mysql", "root:@tcp(localhost:3306)/shoppingApp")
	if err != nil {
		panic(err.Error())
	}

	router := mux.NewRouter()

	//endpoints
	router.HandleFunc("/getPublicUser", GetPublicUser).Methods("POST")
	router.HandleFunc("/getPrivateUser", GetPrivateUser).Methods("POST")

	log.Fatal(http.ListenAndServe(":3001", router))
	defer db.Close()
}
