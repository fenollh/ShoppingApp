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

//CreateUser receive the user json object and upload it to the DB
func CreateUser(w http.ResponseWriter, req *http.Request) {
	var user User
	_ = json.NewDecoder(req.Body).Decode(&user)
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

//Login g
func Login(w http.ResponseWriter, req *http.Request) {
	var user User
	var expectedPassword string
	_ = json.NewDecoder(req.Body).Decode(&user)
	SeErr := db.QueryRow("SELECT password FROM users WHERE usermail=?", user.USERMAIL).Scan(&expectedPassword)
	if SeErr != nil {
		fmt.Println(SeErr)
		json.NewEncoder(w).Encode(SeErr)
		return
	}
	if expectedPassword != user.PASSWORD {
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

func main() {
	fmt.Println("Server listening in port 3001")
	db, err = sql.Open("mysql", "root:@tcp(localhost:3306)/shoppingApp")
	if err != nil {
		panic(err.Error())
	}

	router := mux.NewRouter()

	//endpoints
	router.HandleFunc("/newuser", CreateUser).Methods("POST")
	router.HandleFunc("/login", Login).Methods("POST")

	log.Fatal(http.ListenAndServe(":3001", router))
	defer db.Close()
}
