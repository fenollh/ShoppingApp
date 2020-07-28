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
	/*
		var exists bool = checkIfExists(user.USERMAIL)
		if exists {
			json.NewEncoder(w).Encode("ERROR: USERMAIL ALREADY EXISTS")
			return
		}*/
	var data string = "(" + "'" + user.USERMAIL + "'" + ", " + "'" + user.USERNAME + "'" + ", " + "'" + user.NAME + "'" + ", " + user.AGE + ", " + "'" + user.IMAGE + "'" + ", " + "5" + ");"
	_, InsErr := db.Query("INSERT INTO users (usermail, username, name, age, image, stars) VALUES " + data)
	if InsErr != nil {
		fmt.Println(InsErr)
		json.NewEncoder(w).Encode(InsErr)
		return
	}
	var sesID = HandleSession(user.USERMAIL)
	fmt.Println(sesID)
	json.NewEncoder(w).Encode("ACCOUNT SUCCESFULY CREATED")
	return
}

//Login g
func Login(w http.ResponseWriter, req *http.Request) {
	var user User
	_ = json.NewDecoder(req.Body).Decode(&user)
	/*
		var expectedPass = select password from users where usermail=user.usermail
		if(expectedPass === user.password){
			delete from sessions where usermail=user.usermail
			var sesID = HandleSession(user.usermail)
			json.NewEncoder(w).Encode(sesID)
		}else return false
	*/
	json.NewEncoder(w).Encode(user)
}

//HandleSession create a sesID and return it
func HandleSession(usermail string) int {
	rand.Seed(time.Now().UnixNano())
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

//checkIFExists a usermail when a account is created
/*
func checkIfExists(usermail string) bool {
	_, serr := db.Query("SELECT * FROM users WHERE usermail= " + "'" + usermail + "';")
	if serr == nil {
		return false
	}
	fmt.Println(serr)
	return true
}*/

func main() {
	fmt.Println("Server listening in port 3001")
	db, err = sql.Open("mysql", "root:@tcp(localhost:3306)/shoppingApp")
	if err != nil {
		panic(err.Error())
	}

	router := mux.NewRouter()

	router.HandleFunc("/newuser", CreateUser).Methods("POST")

	log.Fatal(http.ListenAndServe(":3001", router))
	defer db.Close()
}
