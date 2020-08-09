package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

var db *sql.DB
var err error

//User a class
type User struct {
	USERMAIL string `json:"usermail"`
	USERNAME string `json:"username"`
	PASSWORD string `json:"password"`
	NAME     string `json:"name"`
	AGE      string `json:"age"`
	IMAGE    string `json:"image"`
}

//Shop class
type Shop struct {
	SHOPMAIL    string `json:"shopmail"`
	SHOPNAME    string `json:"shopname"`
	PASSWORD    string `json:"password"`
	MANAGERNAME string `json:"managername"`
	SHOPTYPE    string `json:"shopType"`
	IMAGE       string `json:"image"`
}

//CreateUser receive the user json object and upload it to the DB
func CreateUser(w http.ResponseWriter, req *http.Request) {
	var user User
	_ = json.NewDecoder(req.Body).Decode(&user)
	userAvailable := CheckUsermail("user", user.USERMAIL)
	if userAvailable == false {
		json.NewEncoder(w).Encode("Error: This email has already been used")
		return
	}
	var data string = "(" + "'" + user.USERMAIL + "'" + ", " + "'" + user.USERNAME + "'" + ", " + "'" + user.NAME + "'" + ", " + user.AGE + ", " + "'" + user.IMAGE + "'" + ", " + "5" + ", " + "'" + user.PASSWORD + "');"
	_, InsErr := db.Query("INSERT INTO users (usermail, username, name, age, image, stars, password) VALUES " + data)
	if InsErr != nil {
		fmt.Println(InsErr)
		json.NewEncoder(w).Encode(InsErr)
		return
	}
	var sesID = HandleSession(user.USERMAIL)
	json.NewEncoder(w).Encode(sesID)
	return
}

//CreateShop receive the user json object and upload it to the DB
func CreateShop(w http.ResponseWriter, req *http.Request) {
	var shop Shop
	_ = json.NewDecoder(req.Body).Decode(&shop)
	userAvailable := CheckUsermail("shop", shop.SHOPMAIL)
	if userAvailable == false {
		json.NewEncoder(w).Encode("Error: This email has already been used")
		return
	}
	var data string = "(" + "'" + shop.SHOPNAME + "'" + ", " + "'" + shop.SHOPMAIL + "'" + ", " + "'" + shop.MANAGERNAME + "'" + ", " + "5" + ", " + "'" + shop.IMAGE + "'" + ", " + "'" + shop.SHOPTYPE + "'" + ", " + "'" + shop.PASSWORD + "');"
	_, InsErr := db.Query("INSERT INTO shops (name, email, managerName, stars, image, shopType, password) VALUES " + data)
	if InsErr != nil {
		fmt.Println(InsErr)
		json.NewEncoder(w).Encode(InsErr)
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
	SeUsrErr := db.QueryRow("SELECT password FROM users WHERE usermail=?", user.USERMAIL).Scan(&expectedPasswordUsr)
	SeShpErr := db.QueryRow("SELECT password FROM shops WHERE mail=?", user.USERMAIL).Scan(&expectedPasswordShp)
	if SeUsrErr != nil && SeShpErr != nil {
		fmt.Println("Error: Error while selecting expected password")
		fmt.Println(SeUsrErr)
		fmt.Println(SeShpErr)
		json.NewEncoder(w).Encode("Error: User  doesn't exists")
		return
	}
	if expectedPasswordUsr != user.PASSWORD && expectedPasswordShp != user.PASSWORD {
		json.NewEncoder(w).Encode("Error: usermail and password don't match")
		return
	}
	var sesID = HandleSession(user.USERMAIL)
	json.NewEncoder(w).Encode(sesID)
	return
}

//HandleSession create a sesID and return it
func HandleSession(usermail string) int {
	rand.Seed(time.Now().UnixNano())
	_, DelErr := db.Query("DELETE FROM sessions WHERE usermail='" + usermail + "';")
	if DelErr != nil {
		fmt.Println(DelErr)
	}
	var newSesID = rand.Intn(100000)
	if newSesID == 0 {
		newSesID = 1
	}
	var data string = "(" + "'" + usermail + "'" + ", " + strconv.Itoa(newSesID) + ");"
	_, InsErr := db.Query("INSERT INTO sessions VALUES " + data)
	if InsErr != nil {
		fmt.Println(InsErr)
	}
	return newSesID
}

//CheckUsermail comproves if the username is in use
func CheckUsermail(usertype string, usermail string) bool {
	var insertQuery string
	var deleteQuery string
	if usertype == "shop" {
		insertQuery = "INSERT INTO users (usermail, username, name, age, stars, password) VALUES ('" + usermail + "', 'f', 'f', '1', '1', '1');"
		deleteQuery = "DELETE FROM users WHERE usermail='" + usermail + "';"
	} else {
		insertQuery = "INSERT INTO shops (name, email, managerName, stars, shopType, password) VALUES ('n', '" + usermail + "', 'm', '1', 's', 'p');"
		deleteQuery = "DELETE FROM shops WHERE email='" + usermail + "';"
	}
	_, InsErr := db.Query(insertQuery)
	if InsErr != nil {
		fmt.Println(InsErr)
		return false
	}
	_, DeErr := db.Query(deleteQuery)
	if DeErr != nil {
		fmt.Println(DeErr)
		return false
	}
	return true
}

func main() {
	fmt.Println("Server listening in port 3001")
	db, err = sql.Open("mysql", "root:@tcp(localhost:3306)/shoppingApp")
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
