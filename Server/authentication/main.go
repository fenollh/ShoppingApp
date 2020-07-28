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

var users []User
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

//GetAll just for test porpuses
func GetAll(w http.ResponseWriter, req *http.Request) {
	json.NewEncoder(w).Encode(users)
	return
}

//GetWithUsername just for test porpuses
func GetWithUsername(w http.ResponseWriter, req *http.Request) {
	params := mux.Vars(req)
	user, _ := params["username"]
	// var data = select * from users where username=user
	json.NewEncoder(w).Encode(user)
	return
}

//CreateUser receive the user json object and upload it to the DB
func CreateUser(w http.ResponseWriter, req *http.Request) {
	var user User
	_ = json.NewDecoder(req.Body).Decode(&user)
	var data string = "(" + "'" + user.USERMAIL + "'" + ", " + "'" + user.USERNAME + "'" + ", " + "'" + user.NAME + "'" + ", " + user.AGE + ", " + "'" + user.IMAGE + "'" + ", " + "5" + ");"
	_, InsErr := db.Query("INSERT INTO users (usermail, username, name, age, image, stars) VALUES " + data)
	if InsErr != nil {
		fmt.Println(InsErr)
	}
	json.NewEncoder(w).Encode(user)
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

/*
func HandleSession(usermail){
	rand.Seed(time.Now().UnixNano())
	var newSesID rand.Intn(100000)
	if (newSesID === 0) newSesID = 1
	insert into sessions (usermail, sesID) values (usermail, newSesID)
	return newSesID
}
*/

func main() {

	db, err = sql.Open("mysql", "root:@tcp(localhost:3306)/shoppingApp")
	if err != nil {
		panic(err.Error())
	}

	router := mux.NewRouter()

	router.HandleFunc("/all", GetAll).Methods("GET")
	router.HandleFunc("/username/{username}", GetWithUsername).Methods("GET")
	router.HandleFunc("/newuser", CreateUser).Methods("POST")

	log.Fatal(http.ListenAndServe(":3001", router))
	fmt.Printf("Server listening in port 3001")
}
